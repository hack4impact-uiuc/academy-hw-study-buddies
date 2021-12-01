import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import SessionForm from '../components/SessionForm';

function SessionSummary( props ) {
  const {session, id} = props;

  return (
    <Card centered className="sessionCard">
      <Card.Content className="insideCard">
        <Card.Header>
          {session.creatorName} is studying {session.class} at {session.location}
        </Card.Header>
        {
          id === session.creator? <SessionForm button={<Button type="default" id="edit-btn">EDIT</Button>} id={session.creatorName} isEdit={true} session={session}/>: <button className="small ui button" id="join-btn">
          JOIN
        </button>
        }
        
      </Card.Content>
    </Card>
  );
}

export default SessionSummary;
