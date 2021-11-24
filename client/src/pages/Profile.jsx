import React, { useEffect, useState } from 'react';
import axios from 'axios';

import 'semantic-ui-css/semantic.min.css';
import '../css/Profile.scss';
import SessionSummary from '../components/SessionSummary';
import ClassForm from '../components/ClassForm.jsx';
import ClassCard from '../components/ClassCard';



const BASE_URL = process.env.REACT_APP_VERCEL_URL
  ? `https://${process.env.REACT_APP_VERCEL_URL}/api`
  : 'http://localhost:9001/api';

/**
 * Returns a sample API response to demonstrate a working backend
 * Returns GET_SAMPLE_FAIL upon failure
 */
export const getAttendingSessions = (userId) => {
  const requestString = `${BASE_URL}/session/attending/${userId}`;
  return axios
    .get(requestString, {
      headers: {
        'Content-Type': 'application/JSON',
      },
    })
    .catch((error) => ({
      type: 'GET_SAMPLE_FAIL',
      error,
    }));
};

export const getUserById = (userId) => {
  const requestString = `${BASE_URL}/user/${userId}`;
  return axios
    .get(requestString, {
      headers: {
        'Content-Type': 'application/JSON',
      },
    })
    .catch((error) => ({
      type: 'GET_SAMPLE_FAIL',
      error,
    }));
};

function Profile({user}) {

  const [sessions, setSessions] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const populateSessionsAndClasses = async () => {
      const resp = await getAttendingSessions(user._id);
      if (!resp.error) {
        console.log(resp.data.result);
        setSessions(resp.data.result);
      }
      setClasses(user.classes)
    };

    populateSessionsAndClasses();
  }, [user._id]);

  // const sessions = [
  //   {
  //     creator: 'Aaron Alexander',
  //     class: 'CS 124',
  //     location: 'Grainger Engineering Library',
  //   },
  //   {
  //     creator: 'Aaron Alexander',
  //     class: 'CS 124',
  //     location: 'Grainger Engineering Library',
  //   },
  // ];
    return (
    <>
      <h2>{user._id}</h2>
      <h1>My Sessions</h1>
      <p></p>
      {sessions.map((session, i) => (
        <SessionSummary session={session} key={i} />
      ))}
      
      {/* {user.classes && <p>{user.classes[0]}</p>} */}
      <h1>My Classes</h1>
      <center>
        {classes && classes.map((userClass, j) => (
          classes && <ClassCard classCardText={userClass} key={j} />
        ))}
      </center>
      <p></p>
      {/* {user.classes && <ClassCard classCardText={user.classes[0]} />} */}
      <ClassForm
              button={<button className="small ui button" id="add-class-btn">Add class</button>}
              user={user}
              setClasses = {setClasses}
      /> 
    </>
  );
}

export default Profile;