import React, { useEffect } from "react"
import { useNoteTimerActions } from "../../../hooks/commands/useNoteTimerActions"
import { useNoteTimer } from "../../../hooks/queries/useNoteTimer"

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
        <div key={`note-timer-${key}`}>A NOTE TIMER!</div>
      ))}
    </div>
  )
}

export default NoteTimers
