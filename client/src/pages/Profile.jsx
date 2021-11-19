import React from 'react';

import ClassCard from '../components/ClassCard';

function Profile({ user }) {
  return (
    <>
      <h1>
        Profile Page for {user.firstName} {user.lastName}
      </h1>
      <ClassCard classCardText={'CS125'} />
    </>
  );
}

export default Profile;
