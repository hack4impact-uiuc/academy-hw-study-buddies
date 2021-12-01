import React from 'react';
import { Button } from 'semantic-ui-react';

import SessionSummary from '../components/SessionSummary';
import SessionForm from '../components/SessionForm';

import '../css/Home.scss';

function Home({ user }) {
  const sessions = [
    {
      creatorName: 'Grace Zhang',
      creator: '619eb17cba373a435428d7d4',
      class: 'CS 128 AB',
      location: 'Grainger Engineering Library',
      attendees: ['someone', 'another person'],
      notes: 'random notes',
      active: true,
      timeout: 43200
    },
    {
      creatorName: 'Grace Zhang',
      creator: '619eb17cba373a435428d7d4',
      class: 'CS 173',
      location: 'Grainger Engineering Library',
      active: false,
      startTime: Date.now() / 1000,
      timeout: 64200
    },
    {
      creatorName: 'Aaron Alexander',
      creator: '123456',
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
        <SessionSummary session={session} id={user._id} key={i} />
      ))}
      <SessionForm button={<Button type="default">+</Button>} id={user._id} isEdit={false} session={null}/>
    </>
  );
}

export default Home;
