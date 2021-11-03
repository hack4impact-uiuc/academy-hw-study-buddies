// @flow
import React, { useEffect, useState } from 'react';
import type { Node } from 'react';

import { getSampleResponse } from '../utils/apiWrapper';

import '../css/Home.css';

function Home(): Node {
  const [text, setText] = useState('You did not run local API!');

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
      <h1>Studying Activity</h1>
      <p>
        Insert studying activity here
        <br />
        {text}
      </p>
    </>
  );
}

export default Home;
