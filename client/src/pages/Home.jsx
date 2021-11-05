import React, { useEffect, useState } from 'react';

import { getSampleResponse } from '../utils/apiWrapper';

import '../css/Home.scss';

function Home() {
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
      <h1>Studying Activity</h1>
      <p>
        Insert studying activity here
        <br />
        {text.length > 0
          ? `You have successfully fetched ${text.length} documents!`
          : 'You did not run local API!'}
      </p>
    </>
  );
}

export default Home;
