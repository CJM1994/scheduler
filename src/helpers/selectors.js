// Return array of appointment objects for a given day, return empty array if no appointments exist
export function getAppointmentsForDay(state, day) {

  const selectedDay = (state.days.filter((eachDay) => eachDay.name === day))[0]
  if (!selectedDay) return [];

  const filteredAppointments =
    Object.values(state.appointments).filter(appointment => selectedDay.appointments.includes(appointment.id));

  return filteredAppointments;
};

// Return array of interviewer object for given day, return empty object if no interviewers available
export function getInterviewersForDay(state, day) {

  const selectedDay = (state.days.filter((eachDay) => eachDay.name === day))[0]
  if (!selectedDay) return [];

  const filteredInterviewers =
    Object.values(state.interviewers).filter(interviewer => selectedDay.interviewers.includes(interviewer.id));

  return filteredInterviewers;
};

// Return object w/ student/interviewer data for a given interview, return null if no interview in slot
export function getInterview(state, interview) {
  if (!interview) return null;
  return { student: interview.student, interviewer: state.interviewers[interview.interviewer] };
};