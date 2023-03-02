export function getAppointmentsForDay(state, day) {
  
  //Finds the days property of the state to find the day object that matches the value of the day parameter
  const filteredDayObject = state.days.find(daysInfo => daysInfo.name === day);

  //If falsy, returns an empty array
  if(!filteredDayObject) {
    return [];
  }

  //Returning state.days.appointments array that matches with the name
  const appointmentsIdArray = filteredDayObject.appointments;
  const appointmentsList = appointmentsIdArray.map(id => state.appointments[id])

  return appointmentsList;
}

export function getInterview(state, interview) {
  
  // Check to see if the interview parameter is falsy, and returns null if so
  if(!interview) {
    return null;
  }

  //If truthy, returns an object
  return (
    {
      student:interview.student,
      interviewer: state.interviewers[interview.interviewer]
    }
  )
}

export function getInterviewersForDay(state, day) {

  //Finds the days property of the state to find the day object that matches the value of the day parameter
  const filteredInterviewers = state.days.find(interviewee => interviewee.name === day);

  //If falsy, returns an empty array
  if(!filteredInterviewers) {
    return [];
  }

  //Returning state.days.appointments array that matches with the name
  const appointmentsIdArray = filteredInterviewers.interviewers;
  const appointmentsList = appointmentsIdArray.map(id => state.interviewers[id])

  return appointmentsList;
}