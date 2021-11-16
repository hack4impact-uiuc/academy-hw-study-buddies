import React from 'react';

import ClassCard from '../components/ClassCard';
import '../css/Profile.scss';

function Profile() {
  return (
    <>
      <h1>Profile Page</h1>
      <div className="class-grid-container">
        <ClassCard text={'CS125'} />
        <ClassCard text={'CS128'} />
        <ClassCard text={'CS173'} />
        <ClassCard text={'CS222'} />
        <ClassCard text={'CS225'} />
      </div>
    </>
  );
}

export default Profile;
