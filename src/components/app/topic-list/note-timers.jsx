import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { TimerContext } from "./context/timer-context"
import { useNoteTimerActions } from "../../../hooks/commands/useNoteTimerActions"
import { useNoteTimer } from "../../../hooks/queries/useNoteTimer"
import Button from "../../shared/button"
import TrashIcon from "../../shared/icons/trash-icon"
import { formatTime } from "./helpers"

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

const NoteTimerDescription = ({
  noteTimerId,
  description,
  handleUpdateNoteTimer,
}) => {
  const [showTextArea, setShowTextArea] = useState(false)
  const [text, setText] = useState("")

  const toggleTextArea = () => setShowTextArea(!showTextArea)

  return (
    <>
      {description !== null ? (
        <p>{description}</p>
      ) : (
        // TODO: Gonna have to add some aria attributes for this...
        <>
          {showTextArea ? (
            <form>
              <textarea value={text} onChange={e => setText(e.target.value)} />
              <button
                onClick={() => {
                  handleUpdateNoteTimer({
                    note_timer_id: noteTimerId,
                    updates: {
                      description: text,
                    },
                  })
                  setText("")
                  toggleTextArea()
                }}
              >
                Submit!
              </button>
              <button onClick={toggleTextArea}>Cancel</button>
            </form>
          ) : (
            <div className="add-description-text" onClick={toggleTextArea}>
              Add a Description
            </div>
          )}
        </>
      )}
    </>
  )
}

const NoteTimers = ({ noteId, note_timer_id_list, toggleShowModal }) => {
  const { parentNotesOfNoteTimers } = useNoteTimer()
  const {
    createNoteTimer,
    listNoteTimers,
    updateNoteTimer,
    deleteNoteTimer,
  } = useNoteTimerActions()

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
      if (note_timer_id_list.length > 0) {
        listNoteTimers({
          offset: 0,
          note_timer_id_list: note_timer_id_list.map(({ id }) => id),
        })
      }
    }
  }, [])

  const handleUpdateNoteTimer = updateNoteTimerData =>
    updateNoteTimer({
      note_id: noteId,
      ...updateNoteTimerData,
    })

  // NOTE: This fucking sucks
  const note_timers = parentNotesOfNoteTimers.hasOwnProperty(noteId)
    ? parentNotesOfNoteTimers[noteId].hasOwnProperty("note_timers")
      ? parentNotesOfNoteTimers[noteId].note_timers
      : []
    : []

  const keys = Object.keys(note_timers)

  return (
    <TimerContext.Consumer>
      {({ elapsedSeconds, activeTimer, startTimer, stopTimer }) => (
        <div>
          {/* IMMEDIATE TODO: FINISH IMPLEMENTING NECESSARY FORMAT
        FOR THIS MODAL FORM! */}
          {keys.map((key, i) => (
            <Container idx={i} key={`note-timer-${key}`}>
              <div className="time-btn-container">
                <div className="elapsed-time">
                  {elapsedSeconds !== null &&
                  activeTimer.noteId === noteId &&
                  activeTimer.noteTimerId === note_timers[key].id
                    ? formatTime(elapsedSeconds)
                    : formatTime(note_timers[key].elapsed_seconds)}
                </div>
                {elapsedSeconds !== null &&
                activeTimer.noteId === noteId &&
                activeTimer.noteTimerId === note_timers[key].id ? (
                  <Button
                    size="EXTRA_SMALL"
                    handleClick={() => {
                      stopTimer()
                    }}
                  >
                    Stop
                  </Button>
                ) : (
                  <Button
                    type="CREATE"
                    size="EXTRA_SMALL"
                    handleClick={() => {
                      toggleShowModal()
                      startTimer({
                        currentElapsedSeconds: note_timers[key].elapsed_seconds,
                        noteId,
                        noteTimerId: note_timers[key].id,
                      })
                    }}
                  >
                    Start
                  </Button>
                )}
              </div>
              <div className="description-trash-container">
                <NoteTimerDescription
                  noteTimerId={note_timers[key].id}
                  description={note_timers[key].description}
                  handleUpdateNoteTimer={handleUpdateNoteTimer}
                ></NoteTimerDescription>
                {/* TODO: Add padding to the right to line it up w/ XIcon */}
                <TrashIcon
                  marginRight={1.4}
                  handleClick={() => {
                    console.log("deleting this b")
                    deleteNoteTimer({
                      note_id: noteId,
                      note_timer_id: note_timers[key].id,
                    })
                  }}
                />
              </div>
            </Container>
          ))}
        </div>
      )}
    </TimerContext.Consumer>
  )
}

export default NoteTimers
