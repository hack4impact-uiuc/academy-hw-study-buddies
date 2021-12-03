import React, { useEffect, useState } from 'react';

import ClassPageCard from '../components/ClassPageCard';
import { getUserClasses } from '../utils/apiWrapper.js';

function Classes() {
  const [classesMembers, setClassesMembers] = useState({});

  useEffect(() => {
    const populateUsers = async () => {
      const resp = await getUserClasses();
      if (!resp.error) {
        const classes_members = {};
        resp.data.result.forEach((element) => {
          element.classes.forEach((course) => {
            if (course in classes_members) {
              classes_members[course].push(element._id);
            } else {
              classes_members[course] = [element._id];
            }
          });
        });
        setClassesMembers(classes_members);
      }
    };

    populateUsers();
  }, []);

  return (
    <>
      <h1>Classes Page</h1>
      <h2>
        Check below to see all of the classes Hack4Impact Members are taking
        this semester.
      </h2>
      <div className="card-container">
        {Object.keys(classesMembers).map((key, i) => (
          <ClassPageCard
            course={key}
            classMembers={classesMembers[key]}
            key={i}
          />
        ))}
      </div>
    </>
  );
}

export default Classes;
