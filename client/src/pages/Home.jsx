import React from 'react';

import '../css/Home.scss';

function Home({ user }) {

  return (
    <>
      <h1>
        Studying activity for {user.firstName} {user.lastName}{' '}
      </h1>
    </>
  );
}

export default Home;
