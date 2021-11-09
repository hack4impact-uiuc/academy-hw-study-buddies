import React from 'react';
import { Card } from 'semantic-ui-react';

function SessionSummary({ session }) {
  return (
    <Card centered className="sessionCard">
      <Card.Content className="insideCard">
        <Card.Header>
          {session.creator} is studying {session.class} at {session.location}
        </Card.Header>
        <a href="uiucrejects.com" className="btn">
          JOIN
        </a>
      </Card.Content>
    </Card>
  );
}

export default SessionSummary;
