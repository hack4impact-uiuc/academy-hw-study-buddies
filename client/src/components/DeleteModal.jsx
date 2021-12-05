import React from 'react';
import { Button, Modal, Header } from 'semantic-ui-react';

import { deleteSession } from '../utils/apiWrapper.js';

import 'semantic-ui-css/semantic.min.css';
import '../css/DeleteModal.scss';

function DeleteModal(props) {
  const { isActive, creator, id, sessions, setSessions } = props;

  const [open, setOpen] = React.useState(false);

  const handleEndAndDelete = async () => {
    const resp = await deleteSession(id);
    if (!resp.error) {
      setSessions([...sessions.filter((curr) => curr._id !== id)]);
      setOpen(false);
    }
  };

  return (
    <Modal
      size="tiny"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button
          className={'session-summary-btn'}
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
          <Header content={`${creator.firstName}, `} />
          <p id="form-text">
            Are you sure you want to {isActive ? 'end' : 'cancel'} this session?
          </p>
          <Button
            className="join-session-button"
            onClick={(e) => {
              e.stopPropagation();
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
