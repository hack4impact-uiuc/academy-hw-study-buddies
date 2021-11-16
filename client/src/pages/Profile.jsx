import React from 'react';

import 'semantic-ui-css/semantic.min.css';
import '../css/Profile.scss';
import SessionSummary from '../components/SessionSummary';
import ClassForm from '../components/ClassForm';

function Profile() {
  const userId = "618a03da68cc5220e45822c5";
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
    return (
    <>
      <h1>Profile Page</h1>
      <h2>{userId}</h2>
      <h1>My Sessions</h1>
      <p></p>
      {sessions.map((session, i) => (
        <SessionSummary session={session} key={i} />
      ))}
      <ClassForm
              button={<button className="small ui button" id="add-class-btn">Add class</button>}
      /> 
      <button className="small ui button" id="add-class-btn">Add class</button>
    </>
  );
}

export default Profile;
