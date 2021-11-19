<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';

import SessionSummary from '../components/SessionSummary';
import SessionForm from '../components/SessionForm';
// import HomeHeader from '../components/HomeHeader';
import { getSampleResponse } from '../utils/apiWrapper';
=======
import React from 'react';

import SessionSummary from '../components/SessionSummary';
>>>>>>> 84d947c3706983be4b32644adc043552834941f9

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

<<<<<<< HEAD
  useEffect(() => {
    const populateText = async () => {
      const resp = await getSampleResponse();
      if (!resp.error) {
        setText(resp.data.result);
      }
    };

    populateText();
  }, []);

=======
>>>>>>> 84d947c3706983be4b32644adc043552834941f9
  return (
    <>
      <h1>
        Studying activity for {user.firstName} {user.lastName}{' '}
      </h1>
      {sessions.map((session, i) => (
        <SessionSummary session={session} key={i} />
      ))}
<<<<<<< HEAD
      <SessionForm button={<Button type="default">+</Button>} />

      <p>
        {text.length > 0
          ? `You have successfully fetched ${text.length} documents!`
          : 'You did not run local API!'}
      </p>
=======
>>>>>>> 84d947c3706983be4b32644adc043552834941f9
    </>
  );
}

export default Home;
