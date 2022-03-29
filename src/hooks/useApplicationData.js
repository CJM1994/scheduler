import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then((all) => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      });

  }, []);

  const setDay = day => setState({ ...state, day });

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({ ...state, appointments });
        setState((prev) => ({ ...prev, days: updateSpots(prev, prev.appointments) }));
      });
  };

  const cancelInterview = (id) => {
    const appointments = {
      ...state.appointments
    };
    appointments[id].interview = null;

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments });
        setState({ ...state, days: updateSpots(state, state.appointments) });
      });
  };

  const updateSpots = function (state, appointments) {

    const currentDay = state.day;
    const startingAppointments = [];
    let returnDays = [];
    let index = 0;

    for (let i = 0; i < state.days.length; i++) {
      if (state.days[i].name === currentDay) {
        startingAppointments.push(...state.days[i].appointments);
        index = i;
      };
    };

    let spots = startingAppointments.length;
    for (const appointment of Object.values(appointments)) {
      if (startingAppointments.includes(appointment.id) && appointment.interview !== null) {
        spots--;
      };
    };

    returnDays.push(...state.days);
    returnDays[index] = { ...returnDays[index], appointments: [...returnDays[index].appointments], interviewers: [...returnDays[index].interviewers], spots }

    // return an updated days array 
    return returnDays;
  };

  return { state, setDay, bookInterview, cancelInterview, updateSpots };

};