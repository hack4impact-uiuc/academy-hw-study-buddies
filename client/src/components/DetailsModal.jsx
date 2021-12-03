import React, { useState } from 'react';
import { Button, Modal, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import '../css/DetailsModal.scss';

function DetailsModal({ session }) {
  const [open, setOpen] = useState(false);
  return (
    <Modal
      className="modal-container"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button className="join-leave-button">JOIN</Button>}
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
            <Button
              className="join-session-button"
              onClick={() => setOpen(false)}
            >
              JOIN SESSION
            </Button>
          </p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}

export default DetailsModal;
