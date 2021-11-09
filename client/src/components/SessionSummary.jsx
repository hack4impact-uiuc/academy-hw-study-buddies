import React from 'react';
import { Card } from 'semantic-ui-react';

function SessionSummary({ session }) {
  return (
    <Card centered className="sessionCard">
      <Card.Content className="insideCard">
        <Card.Header>{session.creator} is studying {session.class} at {session.location}</Card.Header>  
        {/* <button className="ui active button">
          <i className="plus"></i>
          Join
        </button>
        <button className="ui disabled button">
          Followed
        </button> */}
      </Card.Content>
    </Card>
  );
}

export default SessionSummary;
