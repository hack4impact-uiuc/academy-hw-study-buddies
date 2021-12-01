import React, { useEffect, useState } from 'react';
import { Card } from 'semantic-ui-react';

import { editSession } from '../utils/apiWrapper.js';
import 'semantic-ui-css/semantic.min.css';
import '../css/SessionSummary.scss';

function SessionSummary(props) {
  const { user, session } = props;

  const [sessionAttendees, setSessionAttendees] = useState([]);
  const [isAttending, setIsAttending] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setSessionAttendees(session.attendees);
  }, [user._id, session.attendees]);

  useEffect(() => {
    setIsAttending(sessionAttendees.includes(user._id));
    setIsActive(session.active);
  }, [user._id, sessionAttendees, session.active]);

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
            {session.creator} will be studying {session.class} at
            {session.location} at {session.startTime}
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
