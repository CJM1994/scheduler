import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Confirm from './Confirm';
import useVisualMode from '../../hooks/useVisualMode';
import Error from './Error';

import './styles.scss';
import Status from './Status';

export default function Appointment(props) {

  const SHOW = 'SHOW';
  const EMPTY = 'EMPTY';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';
  const CONFIRM = 'CONFIRM';
  const EDIT = 'EDIT';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {

    const interview = {
      student: name,
      interviewer
    };

    if (interview.interviewer === null || interview.student === '') {
      back();
    }
    else {
      transition(SAVING);
      props.bookInterview(props.id, interview)
        .then(() => {
          transition(SHOW);
        })
        .catch((error) => {
          transition(ERROR_SAVE, true);
          console.log(error);
        });
    };

  };

  const deleteInterview = () => {

    transition(DELETING);

    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => {
        transition(ERROR_SAVE, true);
        console.log(error);
      });

  };

  const confirm = (callback) => {
    if (mode === CONFIRM) {
      callback();
    } else {
      transition(CONFIRM);
    }
  };

  const edit = () => {
    transition(EDIT);
  };

  return (
    <article className='appointment'>
      <Header time={props.time} />

      {mode === SHOW &&
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirm}
          onEdit={edit}
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

      {mode === EDIT &&
        <Form
          onCancel={back}
          interviewers={props.interviewers}
          onSave={save}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      }

      {mode === SAVING &&
        <Status message='Saving...' />
      }

      {mode === DELETING &&
        <Status message='Deleting...' />
      }

      {mode === CONFIRM &&
        <Confirm onCancel={back} onConfirm={() => confirm(deleteInterview)} message='Are you sure you want to delete this appointment?' />
      }

      {mode === ERROR_SAVE &&
        <Error message='Server Error Ocurred When Saving' onClose={back} />
      }

      {mode === ERROR_DELETE &&
        <Error message='Server Error Ocurred When Deleting' onClose={back} />
      }

    </article>
  );
};