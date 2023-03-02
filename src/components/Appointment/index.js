import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";

import "./styles.scss";
import Form from "./Form";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header
        time={props.time}
      />
      
      {mode === EMPTY && 
        <Empty 
          onAdd={() => {
            console.log("Clicked onAdd")
            transition(CREATE)
          }}
        />
      }

      {mode === CREATE &&
        <Form
          interviewers={[]}
          onCancel={() => {
            transition(EMPTY)
          }}
        />
      }

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
    </article>
  )
}