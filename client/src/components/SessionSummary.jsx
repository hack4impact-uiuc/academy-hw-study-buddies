import React, { useEffect, useState } from 'react';
import { Card } from 'semantic-ui-react';

import { editSession } from '../utils/apiWrapper.js';
import 'semantic-ui-css/semantic.min.css';
import '../css/SessionSummary.scss';

function SessionSummary(props) {
  const { user, session } = props;

  const [sessionAttendees, setSessionAttendees] = useState([]);
  const [isAttending, setIsAttending] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [startDate, setStartDate] = useState('January 1');
  const [startTime, setStartTime] = useState('12:00 PM');

  useEffect(() => {
    setSessionAttendees(session.attendees);
    setIsAttending(session.attendees.includes(user._id));
    setIsActive(session.active);

    if (!session.active) {
      const parseDate = (epochTime) => {
        let date = new Date(0);
        date.setUTCSeconds(epochTime);

        setStartDate(date.toDateString());
        setStartTime(date.toLocaleTimeString());
      };

      parseDate(session.startTime);
    }
  }, [user._id, session]);

  const handleJoin = async () => {
    if (!sessionAttendees.includes(user._id)) {
      let updatedAttendees = sessionAttendees;
      updatedAttendees.push(user._id);
      setSessionAttendees(updatedAttendees);
      setIsAttending(true);
      const updatedSession = {
        attendees: updatedAttendees,
      };
      await editSession(session._id, updatedSession);
    }
  };

  const handleLeave = async () => {
    if (sessionAttendees.includes(user._id)) {
      let updatedAttendees = sessionAttendees.filter(
        (attendee) => attendee !== user._id,
      );
      setSessionAttendees(updatedAttendees);
      setIsAttending(false);
      const updatedSession = {
        attendees: updatedAttendees,
      };
      await editSession(session._id, updatedSession);
    }
  };

  return (
    <Card centered className="sessionCard">
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

        {isAttending ? (
          <button
            className="small ui button"
            id="join-btn"
            onClick={handleLeave}
          >
            LEAVE
          </button>
        ) : (
          <button
            className="small ui button"
            id="join-btn"
            onClick={handleJoin}
          >
            JOIN
          </button>
        )}
      </Card.Content>
    </Card>
  );
}

export default SessionSummary;
