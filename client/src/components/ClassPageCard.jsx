import React from 'react';
import { Card } from 'semantic-ui-react';

import '../css/ClassPageCard.scss';

function ClassPageCard(props) {
  const { course, classMembers } = props;
  return (
    <>
      <Card className="class-cards">
        <Card.Content>
          <Card.Header>{course}</Card.Header>
          <Card.Description>
            {classMembers.map((name) => (
              <p key={name}>{name}</p>
            ))}
          </Card.Description>
        </Card.Content>
      </Card>
    </>
  );
}

export default ClassPageCard;
