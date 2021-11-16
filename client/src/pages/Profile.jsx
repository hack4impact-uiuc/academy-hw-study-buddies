import React from 'react';

import '../css/Profile.scss';

function Profile() {
  const userId = "618a03da68cc5220e45822c5";
    return (
    <>
    
      <h1>Profile Page</h1>
      <h2>{userId}</h2>
      <button className="add-class-button">Add class</button>
      <>
    </>
  );
}

export default Profile;
