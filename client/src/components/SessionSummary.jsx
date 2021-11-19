import React from 'react';
import { Card } from 'semantic-ui-react';

import DetailsModal from './DetailsModal';
import DeleteModal from './DeleteModal';
import 'semantic-ui-css/semantic.min.css';

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

      {/* {shouldDisplayButton ? <div>true</div> : <div>false</div>} */}
    </Card>
  );
}

export default SessionSummary;
