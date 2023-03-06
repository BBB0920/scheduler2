import { useState, useEffect } from "react";
import axios from "axios";

// Imported from Application to make the code more modular
// This custom hook will load initial data from the API, and update the state (and subsequently cause rendering)
export default function useApplicationData() {

  const [state, setState] = useState({
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {},
    })

    // Need to do this separate from the above because we need to pass setDay as a prop, and need to reference it
    const setDay = day => setState({ ...state, day });

    useEffect(() => {
      Promise.all([
        axios.get("/api/days"), 
        axios.get("/api/appointments"),
        axios.get("/api/interviewers")
      ]).then((all) => {
        setState(prev => ({
          ...prev, 
          days: all[0].data, 
          appointments: all[1].data,
          interviewers: all[2].data
        }))
      })
    }, [])

    // Books an interview at a given time slot, uses id as identifier
    function bookInterview(id, interview) {

      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({...state, appointments})
        const spots = updateRemainingSpots(state.day)
      })
    }

    
    function cancelInterview(id) {
      
      const appointment = {
        ...state.appointments[id],
        interview: null
      };

      const appointments = {
        ...state.appointments, 
        [id]: appointment
      };

      return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({...state, appointments})
        const spots = updateRemainingSpots(state.day)
      })
    }

    // Updates remaining interview spots given the day using null interviews
    function updateRemainingSpots(selectedDay) {
      const [daysArr] = state.days.filter(day => day.name === selectedDay);
      const appointmentsOnSelectedDay = (daysArr.appointments).map((id) => state.appointments[id]);
      const remainingSpots = appointmentsOnSelectedDay.filter((appt) => appt.interview === null);
      return remainingSpots.length;
    }

  return { state, setDay, bookInterview, cancelInterview }
}