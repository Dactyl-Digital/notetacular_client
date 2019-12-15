import React, { useState, useEffect } from "react"
import { useNoteTimerActions } from "../../../hooks/commands/useNoteTimerActions"
import { TimerContext } from "./context/timer-context"
import { formatTime } from "./helpers"

const Timer = ({ children }) => {
  const { updateNoteTimer } = useNoteTimerActions()
  const [elapsedSeconds, setElapsedSeconds] = useState(null)
  const [activeTimer, setActiveTimer] = useState({
    noteId: null,
    noteTimerId: null,
  })

  let timer = elapsedSeconds => {
    setTimeout(() => {
      if (elapsedSeconds === null) {
        setElapsedSeconds(null)
      } else {
        setElapsedSeconds(elapsedSeconds + 1)
      }
    }, 1000)
  }
  useEffect(() => {
    if (activeTimer.noteId && activeTimer.noteTimerId) {
      timer(elapsedSeconds)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [elapsedSeconds])

  const handleUpdateNoteTimer = ({ noteId, ...updateNoteTimerData }) =>
    updateNoteTimer({
      note_id: noteId,
      ...updateNoteTimerData,
    })

  const startTimer = ({ currentElapsedSeconds, noteId, noteTimerId }) => {
    if (activeTimer.noteId === null && activeTimer.noteTimerId === null) {
      // setElapsedSeconds(currentElapsedSeconds)
      setActiveTimer({ noteId, noteTimerId })
      timer(currentElapsedSeconds)
    } else {
      // Tell user to cancel current running timer
    }
  }

  const stopTimer = ({ noteId, noteTimerId }) => {
    if (
      activeTimer.noteId === noteId &&
      activeTimer.noteTimerId === noteTimerId
    ) {
      // timer(null)
      handleUpdateNoteTimer({
        noteId,
        note_timer_id: noteTimerId,
        updates: {
          elapsed_seconds: elapsedSeconds,
        },
      })
      timer(null)
      // setElapsedSeconds(null)
      setActiveTimer({ noteId: null, noteTimerId: null })
    }
    // Persist updated noteTimer stuff
  }

  return (
    <TimerContext.Provider
      value={{
        elapsedSeconds,
        activeTimer,
        startTimer,
        stopTimer,
      }}
    >
      <>
        {/* TODO: Create a new modal component which will display the current timer
      When the timer is running */}
        {elapsedSeconds && (
          <h1 id="time-count">{formatTime(elapsedSeconds)}</h1>
        )}
        {children}
      </>
    </TimerContext.Provider>
  )
}

export default Timer
