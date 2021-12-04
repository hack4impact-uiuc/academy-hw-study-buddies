import React, { useEffect, useState } from 'react';
import { Button, Card } from 'semantic-ui-react';

import { editSession } from '../utils/apiWrapper.js';

// import DetailsModal from './DetailsModal.jsx';
import 'semantic-ui-css/semantic.min.css';
import '../css/SessionSummary.scss';

import DeleteModal from '../components/DeleteModal.jsx';

function SessionSummary(props) {
  const { user, session, ...rest } = props;
  // const { user, session } = props;

  const [sessionAttendees, setSessionAttendees] = useState([]);
  const [isAttending, setIsAttending] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [startDate, setStartDate] = useState('January 1');
  const [startTime, setStartTime] = useState('12:00 PM');
  const [isCreator, setCreator] = useState(true);

  useEffect(() => {
    setIsActive(session.active);
    setSessionAttendees(session.attendees);
    setIsAttending(session.attendees.includes(user._id));
    setCreator(session.creator === user._id);
    console.log(
      'Session: ',
      session,
      '\n isCreator: ',
      session.creator === user._id,
    );

    if (!session.active) {
      // Parse startTime from epoch time to Date object
      const parseDate = (epochTime) => {
        let date = new Date(0);
        date.setUTCSeconds(epochTime);

        setStartDate(date.toDateString());
        setStartTime(
          date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        );
      };

      parseDate(session.startTime);
    }
  }, [user._id, session]);

  const handleJoinAndLeave = async () => {
    let updatedAttendees = sessionAttendees;

    if (!isAttending && !sessionAttendees.includes(user._id)) {
      // Join session if user is not currently attending
      updatedAttendees = [...sessionAttendees, user._id];
    } else if (sessionAttendees.includes(user._id)) {
      // Remove user from attendees array if currently attending
      updatedAttendees = sessionAttendees.filter(
        (attendee) => attendee !== user._id,
      );
    } else {
      return;
    }

    setSessionAttendees(updatedAttendees);
    setIsAttending(!isAttending);
    const updatedSession = {
      attendees: updatedAttendees,
    };
    await editSession(session._id, updatedSession);
  };

  return (
    <Card
      centered
      className={`sessionCard ${!isActive && 'upcoming'}`}
      {...rest}
    >
      <Card.Content className="insideCard">
        {isActive ? (
          <Card.Header>
            {session.creator} is studying {session.class} at {session.location}
          </Card.Header>
        ) : (
          <Card.Header>
            {session.creator} will be studying {session.class} at{' '}
            {session.location} on {startDate} at {startTime}
          </Card.Header>
        )}

        {isCreator ? (
          <DeleteModal
            isActive={isActive}
            creator={session.creator}
            id={session._id}
          />
        ) : (
          <Button
          className="join-leave-btn"
          size="small"
          onClick={(event) => {
            event.stopPropagation();
            handleJoinAndLeave(event);
          }}
          content={isAttending ? 'LEAVE' : 'JOIN'}
        />
        )}
      </Card.Content>
    </Card>
  );
}

export default SessionSummary;
