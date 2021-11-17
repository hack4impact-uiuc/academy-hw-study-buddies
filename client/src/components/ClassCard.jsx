import React from 'react';
import { Card, Button } from 'semantic-ui-react';

import { editUserClasses } from '../utils/apiWrapper';
import '../css/ClassCard.scss';


function ClassCard(props) {
  const { classCardText } = props;
  return (
    <Card>
      <Card.Content className="card-content-container">
        <Card.Description>{ classCardText }</Card.Description>
        <Button basic color="red" onClick={ editUserClasses() }>X</Button>
      </Card.Content>
    </Card>
  );
}

export default ClassCard;
