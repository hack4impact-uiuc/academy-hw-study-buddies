import React, { useState } from 'react';
import { Modal, Form, Input, TextArea, Radio } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import { addSession, editSession } from '../utils/apiWrapper';
import '../css/SessionForm.scss';

function SessionForm(props) {
  const { button, id, isEdit, session } = props;
  const [open, setOpen] = useState(false);
  const [isLater, setIsLater] = useState(false);
  const [courseCode, setCourseCode] = useState('');
  const [courseNumber, setCourseNumber] = useState();
  const [courseSuffix, setCourseSuffix] = useState('');
  const [location, setLocation] = useState('');
  const [attendees, setAttendees] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [endTimeDefined, setEndTimeDefined] = useState(false);

  const processFormAndSubmit = async () => {
    const validCourseCode = courseCode.length > 0;
    const validCourseNumber = courseNumber.length > 0;
    const validLocation = location.length > 0;
    const validStartTime = !(isLater && startTime === null);

    if (
      (isLater && !startTime) ||
      (isLater && !date) ||
      !validCourseCode ||
      !validCourseNumber ||
      !validLocation ||
      !validStartTime
    ) {
      throw 'Form is incomplete';
    }

    const course = courseCode + courseNumber + courseSuffix;
    const attendeeArray = attendees.length > 0 ? attendees.split(',') : [''];

    const defaultTimeout = 43200;
    const millisecondsInDay = 86400000;
    const active = !isLater;
    const processedStartDate = active ? 0 : date.split('-'); //2021-11-17
    const processedStartTime = active ? 0 : startTime.split(':');
    const laterStart = active
      ? 0
      : new Date(
          parseInt(processedStartDate[0]),
          parseInt(processedStartDate[1]),
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
      creator: id,
      class: course,
      location: location,
      attendees: attendeeArray,
      notes: notes,
      active: !isLater,
      startTime: startSeconds,
      timeout: timeout,
    };
    console.log(sessionData);
    (await isEdit)
      ? editSession(session._id, sessionData)
      : addSession(sessionData);
  };

  const formSetup = () => {
    const splitClass = session.class.split(/([0-9]+)/);
    setCourseCode(splitClass[0]);
    setCourseNumber(splitClass[1]);
    if (splitClass.length > 2) {
      setCourseSuffix(splitClass[2]);
    }
    setLocation(session.location);
    setAttendees(
      session.attendees.length > 0
        ? session.attendees.join(',')
        : session.attendees,
    );
    setNotes(session.notes);

    setIsLater(!session.active);
    const startSeconds = session.startTime;

    if (!session.active) {
      const startDate = new Date(startSeconds * 1000);
      const year = startDate.getFullYear();
      const month = startDate.getMonth();
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
      onClose={() => setOpen(false)}
      onOpen={() => {
        setOpen(true);
        if (isEdit) {
          formSetup();
        }
      }}
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
              onChange={(e) => {
                setCourseCode(e.target.value);
                console.log(courseCode);
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
                console.log(courseNumber);
              }}
            />
            <Form.Field
              label="Course Suffix"
              placeholder="Course suffix"
              control={Input}
              value={courseSuffix}
              onChange={(e) => {
                setCourseSuffix(e.target.value);
                console.log(courseSuffix);
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
                console.log(location);
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
                console.log(date);
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
                console.log(startTime);
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
          <Form.Field
            label="Attendees"
            placeholder="List the other attendees"
            control={Input}
            value={attendees}
            onChange={(e) => {
              setAttendees(e.target.value);
            }}
          />
          <Form.TextArea
            label="Notes"
            placeholder="Additional notes"
            control={TextArea}
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
            }}
          />
          <Form.Button onClick={processFormAndSubmit}>Submit</Form.Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default SessionForm;
