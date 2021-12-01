import React from 'react';
import { /*Button,*/ Card } from 'semantic-ui-react';

import DetailsModal from './DetailsModal';
import DeleteModal from './DeleteModal';

import 'semantic-ui-css/semantic.min.css';
import '../css/SessionSummary.scss';

function SessionSummary({ session }) {
  // const [shouldDisplayButton, setShouldDisplayButton] = useState(false);

  // useEffect(() => {
  //   const DisplayButton = () => {
  //     if (session.id.equals(user.id)) {
  //       setShouldDisplayButton(true);
  //     } else {
  //       setShouldDisplayButton(false);
  //     }
  //   };

  //   DisplayButton();
  // }, [session, user]);

  return (
    <Card centered className="sessionCard">
      <Card.Content className="insideCard">
        <Card.Header>
          {session.creator} is studying {session.class} at {session.location}
        </Card.Header>
        <DetailsModal session={session} />
        <DeleteModal session={session} />
      </Card.Content>

      {
        //session.creator === session.id && (session.isFutureSession ? <EndSession /> : <Button>No</Button>)
      }
    </Card>
  );
}

export default SessionSummary;
