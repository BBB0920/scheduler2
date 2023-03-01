export default function getAppointmentsForDay(state, day) {

  const filteredDayObject = state.days.find(daysInfo => daysInfo.name === day);

  if(!filteredDayObject) {
    return [];
  }

  //Returning state.days.appointments array that matches with the name
  const appointmentsIdArray = filteredDayObject.appointments;
  const appointmentsList = appointmentsIdArray.map(id => state.appointments[id])

  return appointmentsList;
}