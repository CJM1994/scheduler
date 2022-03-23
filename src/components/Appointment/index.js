import React from 'react';

import 'components/Appointment/styles.scss';

export default function Appointment(props) {
  return (
    <article className='appointment'>Appointment at {props.time}</article>
  );
};