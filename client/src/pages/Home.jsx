import React, { useEffect, useState } from 'react';

// import SessionSummary from '../components/SessionSummary';
// import HomeHeader from '../components/HomeHeader';
import { getSampleResponse } from '../utils/apiWrapper';

import '../css/Home.scss';

function Home({user}) {
  const [text, setText] = useState([]);

  useEffect(() => {
    const populateText = async () => {
      const resp = await getSampleResponse();
      if (!resp.error) {
        setText(resp.data.result);
      }
    };
    console.log("user: ", user);

    populateText();
  }, [user]);

  return (
    <>
      {/* <h2 className="homeHeader">Welcome, {creator}</h2> */}
      <h1>Studying activity for {user.firstName} {user.lastName} </h1>
      <p></p>
      {/* {sessions.map((session, i) => (
        <SessionSummary session={session} key={i} />
      ))} */}
      <p>
        {text.length > 0
          ? `You have successfully fetched ${text.length} documents!`
          : 'You did not run local API!'}
      </p>
    </>
  );
}

export default Home;
