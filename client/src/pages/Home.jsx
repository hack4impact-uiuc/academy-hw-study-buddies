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
      id: 'Aaron Alexander',
      class: 'CS 124',
      location: 'Grainger Engineering Library',
      attendees: ['Ellie', ', ', 'Danielle', ', ', 'Grace'],
      notes: 'hey bestie',
      time: 'January 1, 1970 | 00:00 GMT',
      isFutureSession: true,
    },
    {
      creator: 'Aaron Alexander',
      id: 'Aaron Alexander',
      class: 'CS 124',
      location: 'Grainger Engineering Library',
      attendees: ['Anthony', ', ', 'Jessica', ', ', 'Ashwin'],
      notes: 'hey hey hey',
      time: 'January 1, 1970 | 00:00 GMT',
      isFutureSession: false,
    },
  ];

  return (
    <>
      <h1 className="welcome-msg">
        Welcome Back, {user.firstName} {user.lastName}
      </h1>

      <h1 className="studying-heading">STUDYING ACTIVITY</h1>

      <div className="studying-activity-container">
        {sessions.map((session, i) => (
          <SessionSummary session={session} key={i} />
        ))}
        <SessionForm
          button={
            <Button className="add-session-btn" type="default">
              <i className="plus icon" id="plus-icon"></i>
            </Button>
          }
          id={user._id}
        />
      </div>

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
