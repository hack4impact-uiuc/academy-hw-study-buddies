import React from 'react';

import ClassCard from '../components/ClassCard';

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
      <div className="classes-display">
        {classes &&
          classes.map(
            (userClass, j) =>
              classes && <ClassCard classCardText={userClass} key={j} />,
          )}
      </div>
      <p></p>
      {/* {user.classes && <ClassCard classCardText={user.classes[0]} />} */}
      <ClassForm
        button={
          <button className="small ui button" id="add-class-btn">
            Add class
          </button>
        }
        user={user}
        setClasses={setClasses}
      />
    </>
  );
}

export default Profile;
