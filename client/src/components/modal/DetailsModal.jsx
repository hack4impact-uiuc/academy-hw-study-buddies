import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

function DetailsModal() {
  return (
    <Modal
      trigger={<Button>JOIN</Button>}
      header="Test"
      content="Hello!"
      actions={['Snooze', { key: 'done', content: 'Done', positive: true }]}
    />
  );
}

export default DetailsModal;
