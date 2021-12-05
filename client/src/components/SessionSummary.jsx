import React, { useEffect, useState } from 'react';
import { Button, Card } from 'semantic-ui-react';

import { editSession } from '../utils/apiWrapper.js';
import SessionForm from '../components/SessionForm';
import 'semantic-ui-css/semantic.min.css';
import '../css/SessionSummary.scss';
import DeleteModal from '../components/DeleteModal.jsx';

function SessionSummary(props) {
  const { user, session, setSession, sessions, setSessions, ...rest } = props;

  const [sessionAttendees, setSessionAttendees] = useState([]);
  const [isAttending, setIsAttending] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [startDate, setStartDate] = useState('January 1');
  const [startTime, setStartTime] = useState('12:00 PM');
  const isEditMode = true;
  const [isCreator, setCreator] = useState(true);

  useEffect(() => {
    setIsActive(session.active);
    setSessionAttendees(session.attendees);
    setIsAttending(
      session.attendees.some((attendee) => attendee._id === user._id),
    );
    setCreator(session.creator._id === user._id);

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
  }, [user, session]);

  const handleJoinAndLeave = async () => {
    console.log(sessionAttendees);
    console.log(session);
    let updatedAttendees = sessionAttendees;

    if (!isAttending) {
      // Join session if user is not currently attending
      updatedAttendees = [...sessionAttendees, user];
    } else {
      // Remove user from attendees array if currently attending
      updatedAttendees = sessionAttendees.filter(
        (attendee) => attendee._id !== user._id,
      );
    }

    setSessionAttendees(updatedAttendees);
    setIsAttending(!isAttending);
    const updatedSession = {
      attendees: updatedAttendees,
    };
    const finalSession = await editSession(session._id, updatedSession);
    if (!finalSession.error) {
      setSession(finalSession.data.result);
    }
    console.log(finalSession);
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
            {session.creator.firstName} {session.creator.lastName} is studying{' '}
            {session.class} at {session.location}
          </Card.Header>
        ) : (
          <Card.Header>
            {session.creator.firstName} {session.creator.lastName} will be
            studying {session.class} at {session.location} on {startDate} at{' '}
            {startTime}
          </Card.Header>
        )}
        <div className="btn-container">
          {isCreator && (
            <SessionForm
              button={
                <Button
                  className="session-summary-btn"
                  content="EDIT"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                />
              }
              creator={session.creator}
              isEditMode={isEditMode}
              session={session}
              setSession={setSession}
            />
          )}

          {isCreator ? (
            <DeleteModal
              isActive={isActive}
              creator={session.creator}
              id={session._id}
              sessions={sessions}
              setSessions={setSessions}
            />
          ) : (
            <Button
              className="session-summary-btn"
              size="small"
              onClick={(event) => {
                event.stopPropagation();
                handleJoinAndLeave(event);
              }}
              content={isAttending ? 'LEAVE' : 'JOIN'}
            />
          )}
        </div>
      </Card.Content>
    </Card>
  );
}

export default SessionSummary;
