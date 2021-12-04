import React from 'react';
import { Button, Modal, Header } from 'semantic-ui-react';

import { deleteSession } from '../utils/apiWrapper.js';

import 'semantic-ui-css/semantic.min.css';
import '../css/DeleteModal.scss';

function DeleteModal({ isActive, creator, id }) {
  const [open, setOpen] = React.useState(false);

  const handleEndAndDelete = async () => {
    const response = await deleteSession(id);
    console.log(response);
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button
          className={'join-leave-btn'}
          size="small"
          onClick={(e) => {
            e.stopPropagation();
          }}
          content={isActive ? 'END' : 'CANCEL'}
        />
      }
    >
      <Modal.Content id="modal-container">
        <Modal.Description>
          <Header>{creator},</Header>
          <p id="form-text">
            Are you sure you want to {isActive ? 'end' : 'cancel'} this session?
          </p>
          <Button
            className="join-session-button"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
              handleEndAndDelete();
            }}
          >
            {isActive ? 'END SESSION' : 'CANCEL SESSION'}
          </Button>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}

export default DeleteModal;
