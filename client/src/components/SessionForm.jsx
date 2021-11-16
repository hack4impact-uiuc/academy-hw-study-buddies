import React from 'react';
import { Modal, Form, Input, TextArea, Radio } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import '../css/SessionForm.scss';

function SessionForm(props) {
  const { button } = props;
  const [open, setOpen] = React.useState(false);
  const [isLater, setIsLater] = React.useState(false);
  const [courseCode, setCourseCode] = React.useState('');
  const [courseNumber, setCourseNumber] = React.useState();
  const [courseSuffix, setCourseSuffix] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [attendees, setAttendees] = React.useState([]);
  const [notes, setNotes] = React.useState('');

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
              value={courseCode}
              onChange={(e, { courseCode }) => setCourseCode(courseCode)}
            />
            <Form.Field
              required
              label="Course Number"
              placeholder="Course number"
              control={Input}
              value={courseNumber}
              onChange={(e, { courseNumber }) => setCourseNumber(courseNumber)}
            />
            <Form.Field
              label="Course Suffix"
              placeholder="Course suffix"
              control={Input}
              value={courseSuffix}
              onChange={(e, { courseSuffix }) => setCourseSuffix(courseSuffix)}
            />
            <Form.Field
              required
              label="Location"
              placeholder="Location"
              control={Input}
              value={location}
              onChange={(e, { location }) => setLocation(location)}
            />
          </Form.Group>
          <Form.Group required inline>
            <Form.Field>
              <b>Start Time</b>
            </Form.Field>
            <Form.Field
              label="Now"
              defaultChecked
              checked={!isLater}
              control={Radio}
              type="radio"
              onClick={() => setIsLater(false)}
            />
            <Form.Field
              label="Later"
              checked={isLater}
              control={Radio}
              type="radio"
              onClick={() => setIsLater(true)}
            />
            <Form.Field
              required={isLater}
              disabled={!isLater}
              label="Date of Session"
              type="date"
              control={Input}
            />
            <Form.Field
              width={6}
              required={isLater}
              disabled={!isLater}
              label="Start Time"
              type="time"
              control={Input}
            />
            <Form.Field
              width={6}
              required
              label="End Time"
              type="time"
              control={Input}
            />
          </Form.Group>
          <Form.Field
            label="Attendees"
            placeholder="List the other attendees"
            control={Input}
            value={attendees}
            onChange={(e, { attendees }) =>
              setAttendees(attendees.split(/\s+/))
            }
          />
          <Form.TextArea
            label="Notes"
            placeholder="Additional notes"
            control={TextArea}
            value={notes}
            onChange={(e, { notes }) => setNotes(notes)}
          />
          <Form.Button onClick="addSession">Submit</Form.Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default SessionForm;
