import React from 'react';
import { Modal, Form, Input, TextArea, Radio} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import '../css/SessionForm.scss';

function SessionForm(props) {
  const {button} = props;
  const [open, setOpen] = React.useState(false);
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={button}
    >
      <Modal.Content form>
        <Form centered>
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
              required
              label="Location"
              placeholder="Location"
              control={Input}
            />
          </Form.Group>
          <Form.Group required inline>
            <label>
              <input type="text" />
              Start Time
            </label>
            <Form.Field label="Now" control={Radio} type="radio" name="Radio" />
            <Form.Field
              label="Later"
              control={Radio}
              type="radio"
              name="Radio"
            />
            <Form.Field
              label="Date of Session"
              placeholder="Date of session"
              control={Input}
            />
            <Form.Field
              label="Time of Session"
              placeholder="Time of session"
              control={Input}
            />
            <Form.Field
              required
              label="Session Length"
              placeholder="Expected session length"
              control={Input}
            />
          </Form.Group>
          <Form.Field
            label="Attendees"
            placeholder="List the other attendees"
            control={Input}
          />
          <Form.TextArea
            label="Notes"
            placeholder="Additional notes"
            control={TextArea}
          />
          <Form.Button>Submit</Form.Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default SessionForm;
