import React from 'react';

import ClassPageCard from '../components/ClassPageCard';

function Classes() {
  const classes_members = {
    cs124: ['aaron', 'anthony', 'danielle', 'grace'],
    cs128: ['albert', 'anthony', 'ellie', 'eesha'],
    ece110: ['anthony', 'ashwin', 'danielle'],
    ece120: ['albert', 'anthony'],
    ece329: ['albert', 'anthony'],
    ece429: ['albert', 'anthony'],
    ece210: ['anthony', 'ashwin', 'danielle'],
  };
  return (
    <>
      <h1>Classes Page</h1>
      <h2>
        Check below to see all of the classes Hack4Impact Members are taking
        this semester.
      </h2>
      <div className="card-container">
        {Object.keys(classes_members).map((key, i) => (
          <ClassPageCard
            course={key}
            classMembers={classes_members[key]}
            key={i}
          />
        ))}
      </div>
    </>
  );
}

export default Classes;
