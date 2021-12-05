import React from 'react';
import { Modal, Form } from 'semantic-ui-react';

import { putUserClass } from '../utils/apiWrapper';
import 'semantic-ui-css/semantic.min.css';

function ClassForm(props) {
  const { button, user, setUser, setClasses } = props;
  const [open, setOpen] = React.useState(false);
  const [courseCode, setCourseCode] = React.useState('');
  const [courseNumber, setCourseNumber] = React.useState('');
  const [courseSuffix, setCourseSuffix] = React.useState('');

  const handleSubmit = async () => {
    const newClass = courseCode + courseNumber + courseSuffix;
    if (courseCode === '' || courseNumber === '') {
      return;
    }
    const updatedUser = user;
    updatedUser.classes = [...user.classes, newClass];

    await putUserClass(updatedUser, user._id);
    setUser(updatedUser);
    setClasses(updatedUser.classes);
    setOpen(false);
    setCourseCode('');
    setCourseNumber('');
    setCourseSuffix('');
  };

  return (
    <Modal
      size="small"
      className="class-form"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={button}
    >
      <Modal.Content form>
        <Form
          size="small"
          centered
          className="popup-form"
          onSubmit={handleSubmit}
        >
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
