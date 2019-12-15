import React, { useEffect } from "react"
import styled from "styled-components"
import { useNoteTimerActions } from "../../../hooks/commands/useNoteTimerActions"
import { useNoteTimer } from "../../../hooks/queries/useNoteTimer"
import Button from "../../shared/button"
import TrashIcon from "../../shared/icons/trash-icon"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${props => (props.idx % 2 === 0 ? "#f0f0f0" : "#fcfcfc")};
  height: 4rem;
  font-family: "Blinker", sans-serif;

  .time-btn-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 40%;
  }

  .description-trash-container {
    display: flex;
    justify-content: space-between;
    width: 60%;
  }

  .elapsed-time {
    font-weight: 600;
    font-size: 1.4rem;
    color: #969494;
    margin-left: -0.7rem;
  }

  .add-description-text {
    color: #00b9ff;
  }
  /* For the description text
  color: #6f6e6e; */
`

const NoteTimers = ({ noteId, note_timer_id_list }) => {
  const { parentNotesOfNoteTimers } = useNoteTimer()
  const { createNoteTimer, listNoteTimers } = useNoteTimerActions()

  useEffect(() => {
    if (parentNotesOfNoteTimers.hasOwnProperty(noteId)) {
      // Still more note timers available on the backend.
      if (!parentNotesOfNoteTimers[noteId].noteTimersPaginationEnd) {
        listNoteTimers({
          offset: parentNotesOfNoteTimers[noteId].listOffset,
          note_timer_id_list: note_timer_id_list.map(({ id }) => id),
        })
      }
    } else {
      listNoteTimers({
        offset: 0,
        note_timer_id_list: note_timer_id_list.map(({ id }) => id),
      })
    }
  }, [])

  // NOTE: This fucking sucks
  const note_timers = parentNotesOfNoteTimers.hasOwnProperty(noteId)
    ? parentNotesOfNoteTimers[noteId].hasOwnProperty("note_timers")
      ? parentNotesOfNoteTimers[noteId].note_timers
      : []
    : []

  const keys = Object.keys(note_timers)

  return (
    <div>
      {/* IMMEDIATE TODO: FINISH IMPLEMENTING NECESSARY FORMAT
      FOR THIS MODAL FORM! */}
      {keys.map((key, i) => (
        <Container idx={i} key={`note-timer-${key}`}>
          <div className="time-btn-container">
            <div className="elapsed-time">
              {note_timers[key].elapsed_seconds}
            </div>
            <Button type="CREATE" size="EXTRA_SMALL">
              Start
            </Button>
          </div>
          <div className="description-trash-container">
            {note_timers[key].description !== null ? (
              <p>{note_timers[key].description}</p>
            ) : (
              // TODO: Gonna have to add some aria attributes for this...
              <div className="add-description-text">Add a Description</div>
            )}
            {/* TODO: Add padding to the right to line it up w/ XIcon */}
            <TrashIcon marginRight={1.4} />
          </div>
        </Container>
      ))}
    </div>
  )
}

export default NoteTimers
