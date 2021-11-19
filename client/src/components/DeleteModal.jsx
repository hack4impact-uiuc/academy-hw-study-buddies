import React from 'react';
import { Button, Modal, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import '../css/DeleteModal.scss';

function DeleteModal({ session }) {
  const [open, setOpen] = React.useState(false);
  return (
    <Modal
      className="modal-container"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button id="endsesh-button">END SESSION</Button>}
    >
      <Modal.Content>
        <Modal.Description>
          <Header>{session.creator},</Header>
          <p id="form-text">
            Are you sure you want to end this session?
            <Button
              className="join-session-button"
              onClick={() => setOpen(false)}
            >
              END SESSION
            </Button>
          </p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}

export default DeleteModal;
