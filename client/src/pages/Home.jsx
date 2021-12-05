import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';

// import SessionSummary from '../components/SessionSummary';
import SessionForm from '../components/SessionForm';
import HomeImgSitting from '../utils/images/homeimg-sitting.png';
import HomeImgLaying from '../utils/images/homeimg-laying.png';
import { getDisplayedSessions } from '../utils/apiWrapper.js';
import DetailsModal from '../components/DetailsModal';
import '../css/Home.scss';

function Home(props) {
  const { user } = props;
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const populateSessions = async () => {
      const resp = await getDisplayedSessions();
      if (!resp.error) {
        setSessions(resp.data.result);
      }
    };

    populateSessions();
  }, []);

  return (
    <>
      <h1 className="welcome-msg">
        Welcome Back, {user.firstName} {user.lastName}
      </h1>

      <h1 className="studying-heading">STUDYING ACTIVITY</h1>

      <div className="studying-activity-container">
        {sessions.map((session, i) => (
          <DetailsModal
            key={i}
            user={user}
            initialSession={session}
            {...props}
          />
        ))}
        <SessionForm
          button={
            <Button className="add-session-btn" type="default">
              <i className="plus icon" id="plus-icon"></i>
            </Button>
          }
          creator={user}
          isEditMode={false}
          sessions={sessions}
          setSessions={setSessions}
        />
        <br />
        <br />
        <br />
      </div>
      <br />
      <br />
      <img
        className="homeimg-sitting"
        src={HomeImgSitting}
        alt="HomeImgSitting"
      />
      <img className="homeimg-laying" src={HomeImgLaying} alt="HomeImgLaying" />
      <div className="academy-msg">
        <b>
          Made with love from the Fa2021 Academy Team
          <br />
          Hack4Impact UIUC 2021
        </b>
      </div>
    </>
  );
}
export default Home;
