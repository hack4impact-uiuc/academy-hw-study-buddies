import React from 'react';
import { Modal, Form} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import '../css/ClassForm.scss';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_VERCEL_URL
  ? `https://${process.env.REACT_APP_VERCEL_URL}/api`
  : 'http://localhost:9001/api';

// import { editUserClasses } from '../utils/apiWrapper';
export const putUserClass = (body, userId) => {
  const requestString = `${BASE_URL}/user/${userId}`;
  return axios
    .put(requestString, body, {
      headers: {
        'Content-Type': 'application/JSON',
      },
    })
    .catch((error) => ({
      type: 'PUT_CLASS_FAIL',
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


function ClassForm(props) {
  const {button, user, setClasses} = props;
  const [open, setOpen] = React.useState(false);
  const [courseCode, setCourseCode] = React.useState("");
  const [courseNumber, setCourseNumber] = React.useState("");
  const [courseSuffix, setCourseSuffix] = React.useState("");
  //addClass function for button needs to add class to user
  // function addClass(){

  // }

  // function updateUserClasses(){
  //   putUserClass(user.classes.append())
  // }



  // handleChange = (e, { user, value }) => this.setState({ [name]: value })
  const handleSubmit = () => {
    console.log(courseCode, courseNumber, courseSuffix)
    const classComplete = courseCode + courseNumber + courseSuffix
    const updatedUser = {
      memberDbId: user.memberDbId,
      classes: [...user.classes, classComplete]
    }
    console.log(updatedUser.classes)
    
    putUserClass(updatedUser, user._id)
    setClasses(updatedUser.classes)
    console.log(user._id)
    console.log(user.classes)
    // setCourseCode("")
    // setCourseNumber("")
    // setCourseSuffix("")
  }

  // handleSubmit onSubmit={this.handleSubmit()}
  return (
    <Modal
      onClose={() => setOpen(false)}
      onSubmit={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={button}
    >
      <Modal.Content form>
        <Form centered className="popup-form" onSubmit = {handleSubmit}>
          <Form.Group inline>
            <Form.Input
              required
              placeholder='Course Code'
              name='Course Code'
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
            />
            <Form.Input
              required
              placeholder='Course Number'
              name='Course Number'
              value={courseNumber}
              onChange={(e) => setCourseNumber(e.target.value)}
            />
            <Form.Input
              placeholder='Course Suffix'
              name='Course Suffix'
              value={courseSuffix}
              onChange={(e) => setCourseSuffix(e.target.value)}
            />
          </Form.Group>
          <Form.Button onClick={handleSubmit} content = 'Submit' />
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default ClassForm;