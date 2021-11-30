import React from 'react';
import { Button } from 'semantic-ui-react';

import SessionSummary from '../components/SessionSummary';
import SessionForm from '../components/SessionForm';
import HomeImgSitting from '../utils/images/homeimg-sitting.png';
import HomeImgLaying from '../utils/images/homeimg-laying.png';
import '../css/Home.scss';

function Home({ user }) {
  const sessions = [
    {
      creator: 'Aaron Alexander',
      class: 'CS 124',
      location: 'Grainger Engineering Library',
    },
    {
      creator: 'Aaron Alexander',
      class: 'CS 124',
      location: 'Grainger Engineering Library',
    },
  ];

  return (
    <>
      <h1 className="welcome-msg">
        Welcome Back, {user.firstName} {user.lastName}
      </h1>

      <div className="studying-activity-container">
        <h1>STUDYING ACTIVITY</h1>
        {sessions.map((session, i) => (
          <SessionSummary session={session} key={i} />
        ))}
        <SessionForm
          button={
            <Button className="add-session-btn" type="default">
              +
            </Button>
          }
          id={user._id}
        />
      </div>

      <img
        className="homeimg-sitting"
        src={HomeImgSitting}
        alt="HomeImgSitting"
      ></img>
      <img
        className="homeimg-laying"
        src={HomeImgLaying}
        alt="HomeImgLaying"
      ></img>
      <div className="academy-msg">
        <b>
          Made with love from the Fa2021 Academy Team <br /> Hack4Impact 2021
        </b>
      </div>
    </>
  );
}

export default Home;
