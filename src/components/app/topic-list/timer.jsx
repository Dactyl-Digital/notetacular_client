import React, { useState, useEffect } from "react"
import { useNoteTimerActions } from "../../../hooks/commands/useNoteTimerActions"
import { TimerContext } from "./context/timer-context"
import { formatTime } from "./helpers"
import TimerModal from "./timer-modal"

// PRIORITY TODO: Troubleshoot why pause wasn't working last time I messed w/ this...

const Timer = ({ children }) => {
  const { updateNoteTimer } = useNoteTimerActions()
  // const [elapsedSeconds, setElapsedSeconds] = useState(null)
  const [timerState, setTimerState] = useState({
    elapsedSeconds: null,
    paused: null,
  })
  // const [pausedSeconds, setPausedSeconds] = useState(null)
  const [activeTimer, setActiveTimer] = useState({
    noteId: null,
    noteTimerId: null,
  })

  let timer = action => {
    setTimeout(() => {
      if (action === "PAUSE") {
        if (process.env.NODE_ENV === "development")
          console.log("pausing timer...")
        setTimerState({
          elapsedSeconds: timerState.elapsedSeconds,
          paused: !timerState.paused,
        })
      } else if (action === "STOP") {
        if (process.env.NODE_ENV === "development")
          console.log("stopping timer...")
        setTimerState({
          elapsedSeconds: null,
          paused: null,
        })
      } else if (action === "START") {
        if (process.env.NODE_ENV === "development") {
          console.log("running timer...")
          console.log("what is paused state? ", timerState.paused)
        }
        setTimerState({
          elapsedSeconds: timerState.elapsedSeconds + 1,
          paused: timerState.paused,
        })
      }
    }, 1000)
  }

  // let timer = ({elapsedSeconds, paused}) => {
  //   setTimeout(() => {
  //     if (elapsedSeconds === null) {
  //       setElapsedSeconds(null)
  //     } else {
  //       setElapsedSeconds(elapsedSeconds + 1)
  //     }
  //   }, 1000)
  // }
  useEffect(() => {
    if (process.env.NODE_ENV === "development")
      console.log("what be timerState in useEffect: ", timerState)
    if (activeTimer.noteId && activeTimer.noteTimerId && !timerState.paused) {
      timer("START")
    }
    return () => {
      clearTimeout(timer)
    }
  }, [timerState])

  const handleUpdateNoteTimer = ({ noteId, ...updateNoteTimerData }) =>
    updateNoteTimer({
      note_id: noteId,
      ...updateNoteTimerData,
    })

  const startTimer = ({ currentElapsedSeconds, noteId, noteTimerId }) => {
    if (process.env.NODE_ENV === "development")
      console.log("what be timerState in startTimer: ", timerState)
    if (
      (activeTimer.noteId === null && activeTimer.noteTimerId === null) ||
      timerState.paused === true
    ) {
      // setElapsedSeconds(currentElapsedSeconds)
      setActiveTimer({ noteId, noteTimerId })
      if (timerState.elapsedSeconds === null) {
        setTimerState({ elapsedSeconds: currentElapsedSeconds, paused: false })
      }
      timer("START")
    } else {
      // Tell user to cancel current running timer
    }
  }

  const stopTimer = () => {
    if (process.env.NODE_ENV === "development")
      console.log("what be timerState in stopTimer: ", timerState)
    handleUpdateNoteTimer({
      noteId: activeTimer.noteId,
      note_timer_id: activeTimer.noteTimerId,
      updates: {
        elapsed_seconds: timerState.elapsedSeconds,
      },
    })
    setActiveTimer({ noteId: null, noteTimerId: null })
    clearTimeout(timer)
    timer("STOP")
  }

  const pauseTimer = () => {
    if (process.env.NODE_ENV === "development")
      console.log("what be timerState in pauseTimer: ", timerState)
    clearTimeout(timer)
    timer("PAUSE")
  }

  return (
    <TimerContext.Provider
      value={{
        elapsedSeconds: timerState.elapsedSeconds,
        activeTimer,
        startTimer,
        stopTimer,
      }}
    >
      <>
        {/* TODO: Create a new modal component which will display the current timer
      When the timer is running */}
        {timerState.elapsedSeconds && (
          <TimerModal
            activeTimer={activeTimer}
            elapsedSeconds={timerState.elapsedSeconds}
            startTimer={startTimer}
            pauseTimer={pauseTimer}
            stopTimer={stopTimer}
          >
            {formatTime(timerState.elapsedSeconds)}
          </TimerModal>
        )}
        {/* This will be the topics-list's ResourceListing components */}
        {children}
      </>
    </TimerContext.Provider>
  )
}

export default Timer
