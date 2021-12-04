import React from 'react';
import { Card, Button } from 'semantic-ui-react';

import { putUserClass } from '../utils/apiWrapper';
import '../css/ClassCard.scss';

function ClassCard(props) {
  const { classCardText, setClasses, user } = props;

  const handleDelete = async () => {
    const classDeleted = user.classes.filter(
      (classes) => classes !== classCardText,
    );

    let updatedUser = {
      memberDbId: user.memberDbId,
      classes: classDeleted,
    };

    console.log(updatedUser.classes);

    await putUserClass(updatedUser, user._id);

    setClasses(updatedUser.classes);
  };

  return (
    <Card className="class-card">
      <Card.Content className="card-content-container">
        <Card.Description className="class-text">
          {classCardText}
        </Card.Description>
        <Button
          basic
          color="red"
          className="delete-button"
          onClick={handleDelete}
        >
          X
        </Button>
      </Card.Content>
    </Card>
  );
}

export default ClassCard;
