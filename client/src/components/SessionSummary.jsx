import React from 'react';
import { Card } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
// import detailsModal from './modals/details';

function SessionSummary({ session }) {
  return (
    <Card centered className="sessionCard">
      <Card.Content className="insideCard">
        <Card.Header>
          {session.creator} is studying {session.class} at {session.location}
        </Card.Header>
        <button className="small ui button" id="join-btn">
          JOIN
        </button>
      </Card.Content>
    </Card>
  );
}

export default SessionSummary;
