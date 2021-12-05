import React, { useState } from 'react';
import { Modal, Header } from 'semantic-ui-react';

import SessionSummary from './SessionSummary';
import 'semantic-ui-css/semantic.min.css';
import '../css/DetailsModal.scss';

function DetailsModal(props) {
  const { initialSession, user } = props;
  const [session, setSession] = useState(initialSession);
  const [open, setOpen] = useState(false);
  return (
    <Modal
      className="details-modal"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <SessionSummary session={session} setSession={setSession} user={user} />
      }
    >
      <Modal.Content>
        <Modal.Description>
          <Header>Join {session.creator}</Header>
          <p id="form-text">
            Class: {session.class}
            <br />
            Location: {session.location}
            <br />
            <br />
            Time Started: {session.time}
            <br />
            Attendees: {session.attendees}
            <br />
            <br />
            Notes from {session.creator}:
            <div className="notes-bg">
              <p>
                <i>{session.notes}</i>
              </p>
            </div>
          </p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}

export default DetailsModal;
