import React from 'react';
import { Card, Button } from 'semantic-ui-react';

import { editUserClasses } from '../utils/apiWrapper';
import '../css/ClassCard.scss';

function ClassCard(props) {
  const { classCardText } = props;
  return (
    <Card className="card">
      <Card.Content className="card-content-container">
        <Card.Description className="class-text">{classCardText}</Card.Description>
        <Button basic color="red" className="delete-button" onClick={editUserClasses}> X </Button>
      </Card.Content>
    </Card>
  );
}

export default ClassCard;
