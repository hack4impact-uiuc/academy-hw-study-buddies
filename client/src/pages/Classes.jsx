import React from 'react';
import ClassPageCard from '../components/ClassPageCard'

function Classes() {
  const classes_members = {
      cs124: ["anthony", "danielle", "grace", "aaron"],
      cs128: ["albert", "anthony", "ellie", "eesha"],
      ece110: ["anthony", "ashwin", "danielle"],
      ece120: ["albert", "anthony"]
  };
  return (
    <>
      <h1>Classes Page</h1>
      <h1>
        {Object.keys(classes_members).map((key, i) =>
          <ClassPageCard course={key} classMembers={classes_members[key]} key={i}/>
        )} 
      </h1>
    </>
  );
}

export default Classes;
