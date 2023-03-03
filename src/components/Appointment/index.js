import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

import useVisualMode from "hooks/useVisualMode";

import "./styles.scss";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING, true);

    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW));
  };

  function cancel() {
    transition(DELETE, true);
    
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY));

  }

  return (
    <article className="appointment">
      <Header
        time={props.time}
      />
      
      {mode === EMPTY && 
        <Empty 
          onAdd={() => {
            transition(CREATE)
          }}
        />
      }

      {mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          onCancel={() => {
            transition(EMPTY)
          }}
          onSave={save}
        />
      }

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}

      {mode === SAVING && (
        <Status
          message="Saving"
        />
      )}

      {mode === DELETE && (
        <Status
          message="Deleting"
        />
      )}

      {mode === CONFIRM && (
        <Confirm
          onCancel={back}
          onConfirm={cancel}
        />
      )}

      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => {
            back()
          }}
        />
      )}

    </article>
  )
}