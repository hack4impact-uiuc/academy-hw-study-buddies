import React from 'react';
import { Card } from 'semantic-ui-react';

import DetailsModal from './DetailsModal';
import 'semantic-ui-css/semantic.min.css';

import '../css/SessionSummary.scss';

function SessionSummary({ session }) {
  return (
    <Card centered className="sessionCard">
      <Card.Content className="insideCard">
        <Card.Header>
          {session.creator} is studying {session.class} at {session.location}
        </Card.Header>
        <DetailsModal session={session} />
      </Card.Content>
    </Card>
  );
}

export default SessionSummary;
