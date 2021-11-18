import React from 'react';
import { Modal, Form, Input} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import '../css/ClassForm.scss';

function ClassForm(props) {
  const {button} = props;
  const [open, setOpen] = React.useState(false);
  
  //addClass function for button needs to add class to user
  // function addClass(){

  // }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={button}
    >
      <Modal.Content form>
        <Form centered className="popup-form">
          <Form.Group inline>
            <Form.Field
              required
              label="Course Code"
              placeholder="Course code"
              control={Input}
            />
            <Form.Field
              required
              label="Course Number"
              placeholder="Course number"
              control={Input}
            />
            <Form.Field
              label="Course Suffix"
              placeholder="Course suffix"
              control={Input}
            />
          </Form.Group>
          <Form.Button onClick = "" >Submit</Form.Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default ClassForm;