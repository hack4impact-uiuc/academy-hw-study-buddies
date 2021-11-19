import React from 'react';

function Classes({ user }) {
  return (
    <>
      <h1>
        Classes Page for {user.firstName} {user.lastName}
      </h1>
    </>
  );
}

export default Classes;
