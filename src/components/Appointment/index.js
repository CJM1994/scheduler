import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Confirm from './Confirm';
import useVisualMode from '../../hooks/useVisualMode';

import './styles.scss';
import Status from './Status';

export default function Appointment(props) {

  const SHOW = 'SHOW';
  const EMPTY = 'EMPTY';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';
  const CONFIRM = 'CONFIRM';

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      });
  };

  const deleteInterview = () => {

    transition(DELETING);

    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      });

  };

  const confirm = () => {
    if (mode === CONFIRM) {
      deleteInterview();
    } else {
      transition(CONFIRM);
    }
  };

  return (
    <article className='appointment'>
      <Header time={props.time} />

      {mode === SHOW &&
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirm}
        />
      }

      {mode === EMPTY &&
        <Empty
          onAdd={() => { transition(CREATE) }}
        />
      }

      {mode === CREATE &&
        <Form
          onCancel={back}
          interviewers={props.interviewers}
          onSave={save}
        />
      }

      {mode === SAVING &&
        <Status message='Saving...' />
      }

      {mode === DELETING &&
        <Status message='Deleting...' />
      }

      {mode === CONFIRM &&
        <Confirm onCancel={back} onConfirm={confirm} message='Are you sure you want to delete this appointment?' />
      }

    </article>
  );
};