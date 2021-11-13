import React from 'react';
import { Form } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import '../css/SessionForm.scss';

function SessionForm() {
  return (
    <Form centered>
      <Form.Group widths="equal">
        <Form.Field required>
          <label>Course Code</label>
          <input placeholder="Course code" />
        </Form.Field>
        <Form.Field required>
          <label>Course Number</label>
          <input placeholder="Course number" />
        </Form.Field>
        <Form.Field required>
          <label>Location</label>
          <input placeholder="Location" />
        </Form.Field>
      </Form.Group>
      <Form.Group inline>
        <label>Start Time</label>
        <Form.Field
        label="Now"
        control="input"
        type="radio"
        name="Radio"
      />
      <Form.Field
        label="Later"
        control="input"
        type="radio"
        name="Radio"
      />
        <Form.Field>
          <label>Date of Session</label>
          <input placeholder="Date of session"/>
        </Form.Field>
        <Form.Field>
          <label>Time of Session</label>
          <input placeholder="Time of session"/>
        </Form.Field>
        <Form.Field required>
          <label>Session length</label>
          <input placeholder="Expected session length"/>
        </Form.Field>
      </Form.Group>

      <Form.Field>
        <label>Attendees</label>
        <input placeholder="List the other attendees" />
      </Form.Field>
      <Form.TextArea label="Notes" placeholder="Additional notes" />
      <Form.Button>Submit</Form.Button>
    </Form>
  );
}

export default SessionForm;
