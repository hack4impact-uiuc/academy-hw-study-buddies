import React from 'react';

import SessionSummary from '../components/SessionSummary';
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
      <h1>
        Studying activity for {user.firstName} {user.lastName}{' '}
      </h1>
      {sessions.map((session, i) => (
        <SessionSummary session={session} key={i} />
      ))}
    </>
  );
}
export default Home;
