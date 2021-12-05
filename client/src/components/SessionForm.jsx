import React, { useState } from 'react';
import {
  Modal,
  Form,
  Input,
  TextArea,
  Radio,
  Dropdown,
} from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import { addSession, editSession, getAllUsers } from '../utils/apiWrapper';
import '../css/SessionForm.scss';

function SessionForm(props) {
  const {
    button,
    creator,
    isEditMode,
    session,
    setSessions,
    setSession,
    sessions,
  } = props;

  const [open, setOpen] = useState(false);
  const [isLater, setIsLater] = useState(false);
  const [courseCode, setCourseCode] = useState('');
  const [courseNumber, setCourseNumber] = useState();
  const [courseSuffix, setCourseSuffix] = useState('');
  const [location, setLocation] = useState('');
  const [attendees, setAttendees] = useState([]);
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [endTimeDefined, setEndTimeDefined] = useState(false);
  const [users, setUsers] = useState([]);

  async function populateUsers() {
    const allUsers = await getAllUsers();
    if (allUsers && allUsers.data.result.length > 0) {
      let finalUsers = [];
      allUsers.data.result.map((user) => {
        if (user.firstName && user.lastName && user._id !== creator._id) {
          finalUsers.push({
            key: user._id,
            value: user,
            text: `${user.firstName} ${user.lastName}`,
          });
        }
      });
      setUsers(finalUsers);
    }
  }

  const processFormAndSubmit = async () => {
    if (
      !courseCode ||
      !courseNumber ||
      !location ||
      (isLater && !startTime) ||
      (isLater && !date)
    ) {
      throw 'Form is incomplete';
    }

    const course = courseCode + courseNumber + courseSuffix;
    const attendeeArray = attendees;
    const defaultTimeout = 43200;
    const millisecondsInDay = 86400000;
    const active = !isLater;
    const processedStartDate = active ? 0 : date.split('-');
    const processedStartTime = active ? 0 : startTime.split(':');
    const laterStart = active
      ? 0
      : new Date(
          parseInt(processedStartDate[0]),
          parseInt(processedStartDate[1] - 1),
          parseInt(processedStartDate[2]),
          parseInt(processedStartTime[0]),
          parseInt(processedStartTime[1]),
          0,
          0,
        );
    const processedStart = active ? new Date() : laterStart;
    const startSeconds = processedStart.getTime() / 1000;

    const processedEndTime = endTimeDefined ? endTime.split(':') : 0;
    const end = endTimeDefined
      ? new Date(
          processedStart.getFullYear(),
          processedStart.getMonth(),
          processedStart.getDate(),
          processedEndTime[0],
          processedEndTime[1],
          0,
          0,
        )
      : 0;
    const endSeconds = endTimeDefined ? end.getTime() / 1000 : 0;
    const timeoutTry = endTimeDefined
      ? endSeconds - startSeconds
      : defaultTimeout;
    const timeout =
      timeoutTry < 0
        ? new Date(end.getTime() + millisecondsInDay).getTime() / 1000 -
          startSeconds
        : timeoutTry;

    const sessionData = {
      creator: creator._id,
      class: course,
      location: location,
      attendees: attendeeArray ? attendeeArray : [],
      notes: notes,
      active: !isLater,
      startTime: startSeconds,
      timeout: timeout,
    };

    if (isEditMode) {
      await editSession(session._id, sessionData);
      setSession({ ...sessionData, _id: session._id, creator });
    } else {
      const updatedSession = await addSession(sessionData);
      updatedSession.data.result['creator'] = creator;
      setSessions([...sessions, updatedSession.data.result]);
    }
    setOpen(false);
  };

  const formSetup = () => {
    populateUsers();
    const splitClass = session.class.split(/([0-9]+)/);
    setCourseCode(splitClass[0]);
    setCourseNumber(splitClass[1]);
    if (splitClass.length > 2) {
      setCourseSuffix(splitClass[2]);
    }
    setLocation(session.location);
    // let initialAttendees = [];
    // session.attendees.map((attendee) => {
    //   initialAttendees = [...initialAttendees, {key: attendee._id, value: attendee, text: `${attendee.firstName} ${attendee.lastName}`}]
    // })
    // console.log(initialAttendees);
    let initialAttendees = [];
    initialAttendees = [...session.attendees];
    initialAttendees.filter((attendee) => attendee._id !== creator._id);
    setAttendees(initialAttendees);
    setNotes(session.notes);

    setIsLater(!session.active);
    const startSeconds = session.startTime;

    if (!session.active) {
      const startDate = new Date(startSeconds * 1000);
      const year = startDate.getFullYear();
      const month = startDate.getMonth() + 1;
      const day = startDate.getDate();

      const processedMonth = month < 10 ? '0'.concat(month) : ''.concat(month);
      const processedDay = day < 10 ? '0'.concat(day) : ''.concat(day);

      const processedDate = ''
        .concat(year)
        .concat('-')
        .concat(processedMonth)
        .concat('-')
        .concat(processedDay);
      setDate(processedDate);

      const startHour = startDate.getHours();
      const startMinute = startDate.getMinutes();

      const processedStartHour =
        startHour < 10 ? '0'.concat(startHour) : ''.concat(startHour);
      const processedStartMinute =
        startMinute < 10 ? '0'.concat(startMinute) : ''.concat(startMinute);
      const processedStartTime = processedStartHour
        .concat(':')
        .concat(processedStartMinute);
      setStartTime(processedStartTime);
    }

    const endDate = new Date((startSeconds + session.timeout) * 1000);
    const endHour = endDate.getHours();
    const endMinute = endDate.getMinutes();

    const processedEndHour =
      endHour < 10 ? '0'.concat(endHour) : ''.concat(endHour);
    const processedEndMinute =
      endMinute < 10 ? '0'.concat(endMinute) : ''.concat(endMinute);
    const processedEndTime = processedEndHour
      .concat(':')
      .concat(processedEndMinute);
    setEndTime(processedEndTime);

    const defaultTimeout = 43200;

    if (session.timeout !== defaultTimeout) {
      setEndTimeDefined(true);
    }
  };

  return (
    <Modal
      size="large"
      onClose={() => setOpen(false)}
      onOpen={() => {
        setOpen(true);
        if (isEditMode) {
          formSetup();
        }
      }}
      open={open}
      trigger={button}
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="session-form-modal"
    >
      <Modal.Content form>
        <div id="form-title">Studying? </div>
        <Form centered className="popup-form">
          <Form.Group inline>
            <Form.Field
              required
              label="Course Code"
              placeholder="Course code"
              control={Input}
              value={courseCode}
              onChange={(e) => {
                setCourseCode(e.target.value);
              }}
            />
            <Form.Field
              required
              label="Course Number"
              placeholder="Course number"
              control={Input}
              value={courseNumber}
              onChange={(e) => {
                setCourseNumber(e.target.value);
              }}
            />
            <Form.Field
              label="Course Suffix"
              placeholder="Course suffix"
              control={Input}
              value={courseSuffix}
              onChange={(e) => {
                setCourseSuffix(e.target.value);
              }}
            />
            <Form.Field
              required
              label="Location"
              placeholder="Location"
              control={Input}
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
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
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
            <Form.Field
              width={6}
              required={isLater}
              disabled={!isLater}
              label="Start Time"
              type="time"
              control={Input}
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value);
              }}
            />
            <Form.Field
              width={6}
              label="End Time"
              type="time"
              control={Input}
              value={endTime}
              onChange={(e) => {
                setEndTime(e.target.value);
                setEndTimeDefined(true);
              }}
            />
          </Form.Group>
          <Form.Group
            inline
            style={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'left',
            }}
          >
            <p style={{ textAlign: 'left' }}>Invite</p>
            <Dropdown
              placeholder="List the other attendees"
              fluid
              multiple
              search
              selection
              options={users}
              onChange={(e, data) => {
                console.log(data.value);
                setAttendees(data.value);
              }}
              value={attendees}
            />
          </Form.Group>
          <Form.TextArea
            label="Additional Notes"
            placeholder="Studying for an exam? Quiet individual study? "
            control={TextArea}
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
            }}
          />
          <Form.Button
            onClick={processFormAndSubmit}
            content={isEditMode ? 'UPDATE' : 'CREATE'}
          ></Form.Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default SessionForm;
