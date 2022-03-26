import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from '../../hooks/useVisualMode';

import './styles.scss';

export default function Appointment(props) {

  const SHOW = 'SHOW';
  const EMPTY = 'EMPTY';
  const CREATE = 'CREATE';

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  return (
    <article className='appointment'>
      <Header time={props.time} />

      {mode === SHOW &&
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      }

      {mode === EMPTY &&
        <Empty
          onAdd={() => { transition(CREATE) }}
        />
      }

      {mode === CREATE &&
        <Form // THIS IS A PLACEHOLDER UNTIL INTERVIEWERS ARE ADDED PROPERLY
          onCancel={back}
          interviewers={[{
            "id": 1,
            "name": "Sylvia Palmer",
            "avatar": "https://i.imgur.com/LpaY82x.png"
          }]}
        />
      }

    </article>
  );
};