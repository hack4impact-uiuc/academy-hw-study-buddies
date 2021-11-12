import React, { useEffect, useState } from 'react';

import SessionSummary from '../components/SessionSummary';
import HomeHeader from '../components/HomeHeader';
import { getSampleResponse } from '../utils/apiWrapper';

import '../css/Home.scss';

function Home() {
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
  const [text, setText] = useState([]);

  useEffect(() => {
    const populateText = async () => {
      const resp = await getSampleResponse();
      if (!resp.error) {
        setText(resp.data.result);
      }
    };

    populateText();
  }, []);

  return (
    <>
      <HomeHeader creator="Name Last" />
      <h1>Studying Activity</h1>
      {/* move HomeHeader.jsx here? */}
      <p></p>
      {sessions.map((session, i) => (
        <SessionSummary session={session} key={i} />
      ))}
      <p>
        {text.length > 0
          ? `You have successfully fetched ${text.length} documents!`
          : 'You did not run local API!'}
      </p>
    </>
  );
}

export default Home;
