import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "../components/DayList";
import Appointment from "../components/Appointment";
import { getAppointmentsForDay } from "../helpers/selectors";

import "../components/Application.scss";

export default function Application(props) {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then((all) => {
        setState({ ...state, days: all[0].data, appointments: all[1].data });
      })

  }, []);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">

        {Object.values(dailyAppointments).map((appointment) => {
          return (
            <Appointment time={appointment.time} interview={appointment.interview} id={appointment.id} key={appointment.id} />
          );
        })}
        <Appointment key='last' time='5pm' />

      </section>
    </main>
  );
};