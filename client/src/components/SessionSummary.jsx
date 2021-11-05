import React from 'react';
import { Card } from 'semantic-ui-react';

function SessionSummary({ session }) {
  return (
    <Card centered className="sessionCard">
      <Card.Content>
        <Card.Header>{session.class}</Card.Header>
        <Card.Description>{session.creator}</Card.Description>
        <Card.Description>{session.location}</Card.Description>
      </Card.Content>
    </Card>
  );
}

export default SessionSummary;
