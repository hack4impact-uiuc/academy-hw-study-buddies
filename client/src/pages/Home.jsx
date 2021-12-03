import React from 'react';
import { Button } from 'semantic-ui-react';

import SessionSummary from '../components/SessionSummary';
import { getSampleResponse } from '../utils/apiWrapper';
import '../css/Home.scss';
import SessionForm from '../components/SessionForm';

function Home({ user }) {
  const sessions = [
    {
      creator: 'Aaron Alexander',
      class: 'CS 124',
      location: 'Grainger Engineering Library',
      attendees: ['Ellie', ', ', 'Danielle', ', ', 'Grace'],
      notes: 'hey bestie',
      time: 'January 1, 1970 | 00:00 GMT',
    },
    {
      creator: 'Aaron Alexander',
      class: 'CS 124',
      location: 'Grainger Engineering Library',
      attendees: ['Anthony', ', ', 'Jessica', ', ', 'Ashwin'],
      notes: 'hey hey hey',
      time: 'January 1, 1970 | 00:00 GMT',
    },
  ];

  return (
    <>
      <h1>
        Studying activity for {user.firstName} {user.lastName}{' '}
      </h1>
      {sessions.map((session, i) => (
        <SessionSummary session={session} key={i} />
      ))}
      <SessionForm button={<Button type="default">+</Button>} id={user._id} />
    </>
  );
}
export default Home;
