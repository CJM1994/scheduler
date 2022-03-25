export function getAppointmentsForDay(state, day) {

  const selectedDay = (state.days.filter((eachDay) => eachDay.name === day))[0]
  if (!selectedDay) return [];

  const filteredAppointments =
    Object.values(state.appointments).filter(appointment => selectedDay.appointments.includes(appointment.id));

  return filteredAppointments;
};