import React from 'react';

import SessionSummary from '../components/SessionSummary';

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
