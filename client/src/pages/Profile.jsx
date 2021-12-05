import React, { useEffect, useState } from 'react';

import { getAttendingSessions } from '../utils/apiWrapper';
import DetailsModal from '../components/DetailsModal';
import ClassForm from '../components/ClassForm.jsx';
import ClassCard from '../components/ClassCard';
import 'semantic-ui-css/semantic.min.css';
import '../css/Profile.scss';

function Profile(props) {
  const { user, setUser } = props;
  const [sessions, setSessions] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const populateSessionsAndClasses = async () => {
      const resp = await getAttendingSessions(user._id);
      if (!resp.error) {
        setSessions(resp.data.result);
      }
      setClasses(user.classes);
    };

    populateSessionsAndClasses();
  }, [user]);

/**
 * Returns a sample API response to demonstrate a working backend
 * Returns GET_SAMPLE_FAIL upon failure
 */

function Profile({ user }) {
  const [sessions, setSessions] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const populateSessionsAndClasses = async () => {
      const resp = await getAttendingSessions(user._id);
      if (!resp.error) {
        console.log(resp.data.result);
        setSessions(resp.data.result);
      }
      setClasses(user.classes);
    };

    populateSessionsAndClasses();
  }, [user]);

  return (
    <>
      <h2>Welcome to your Profile Page, {user.firstName}</h2>

      <h1>My Sessions</h1>
      <p></p>
      {sessions.map((session, i) => (
        <DetailsModal
          key={i}
          user={user}
          initialSession={session}
          sessions={sessions}
          setSessions={setSessions}
          {...props}
        />
      ))}

      <h1>My Classes</h1>
      <div className="classes-display">
        {classes &&
          classes.map(
            (userClass, j) =>
              classes && (
                <ClassCard
                  classCardText={userClass}
                  key={j}
                  setClasses={setClasses}
                  user={user}
                />
              ),
          )}
      </div>
      <p></p>

      <ClassForm
        button={
          <button className="small ui button" id="add-class-btn">
            Add class
          </button>
        }
        user={user}
        setUser={setUser}
        setClasses={setClasses}
      />
    </>
  );
}

export default Profile;
