import React from 'react';
import { Modal, Form } from 'semantic-ui-react';

import { putUserClass } from '../utils/apiWrapper';
import 'semantic-ui-css/semantic.min.css';
import '../css/ClassForm.scss';

function ClassForm(props) {
<<<<<<< HEAD
  const { button, user, setClasses } = props;
=======
  const { button, user, setUser, setClasses } = props;
>>>>>>> a94fe503d50d674f2e2a5101bc1e608565357963
  const [open, setOpen] = React.useState(false);
  const [courseCode, setCourseCode] = React.useState('');
  const [courseNumber, setCourseNumber] = React.useState('');
  const [courseSuffix, setCourseSuffix] = React.useState('');

  const handleSubmit = async () => {
<<<<<<< HEAD
    console.log(courseCode, courseNumber, courseSuffix);
    const classComplete = courseCode + courseNumber + courseSuffix;
    if (courseCode === '' || courseNumber === '') {
      return;
    }
    const updatedUser = {
      memberDbId: user.memberDbId,
      classes: [...user.classes, classComplete],
    };
    console.log(updatedUser.classes);

    await putUserClass(updatedUser, user._id);

=======
    const newClass = courseCode + courseNumber + courseSuffix;
    if (courseCode === '' || courseNumber === '') {
      return;
    }
    const updatedUser = user;
    updatedUser.classes = [...user.classes, newClass];

    await putUserClass(updatedUser, user._id);
    setUser(updatedUser);
>>>>>>> a94fe503d50d674f2e2a5101bc1e608565357963
    setClasses(updatedUser.classes);
    setOpen(false);
    setCourseCode('');
    setCourseNumber('');
    setCourseSuffix('');
<<<<<<< HEAD
    console.log(user._id);
    console.log(user.classes);
=======
>>>>>>> a94fe503d50d674f2e2a5101bc1e608565357963
  };

  return (
    <Modal
<<<<<<< HEAD
=======
      className="class-form"
>>>>>>> a94fe503d50d674f2e2a5101bc1e608565357963
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={button}
    >
      <Modal.Content form>
<<<<<<< HEAD
        <Form
          size="small"
          centered
          className="popup-form"
          onSubmit={handleSubmit}
        >
=======
        <Form size="small" centered>
>>>>>>> a94fe503d50d674f2e2a5101bc1e608565357963
          <Form.Group inline>
            <Form.Input
              required
              label="Course Code"
              placeholder="Course Code"
              name="Course Code"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
            />
            <Form.Input
              required
              label="Course Number"
              placeholder="Course Number"
              name="Course Number"
              value={courseNumber}
              onChange={(e) => setCourseNumber(e.target.value)}
            />
            <Form.Input
              label="Course Suffix"
              placeholder="Course Suffix"
              name="Course Suffix"
              value={courseSuffix}
              onChange={(e) => setCourseSuffix(e.target.value)}
            />
          </Form.Group>
          <Form.Button onClick={handleSubmit} content="Submit" />
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default ClassForm;
