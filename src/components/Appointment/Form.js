import React, { useState } from 'react';
import InterviewerList from '../InterviewerList';
import Button from '../Button';

export default function Form(props) {

  const [student, setStudent] = useState(props.student || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null)
  const [error, setError] = useState('');

  const reset = function () {
    setStudent('');
    setInterviewer(null);
  };

  const cancel = function () {
    reset();
    props.onCancel();
  };

  const validate = function () {
    if (student === '') {
      setError('Student name cannot be blank');
      return;
    };
  };

  const enableSave = true;

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            data-testid='student-name-input'
            className="appointment__create-input text--semi-bold"
            name="name"
            value={student}
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button
            confirm disabled={!enableSave}
            onClick={() => {
              validate();
              if (student !== '') props.onSave(student, interviewer);
            }}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};
