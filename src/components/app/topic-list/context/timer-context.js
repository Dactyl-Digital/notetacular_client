import React from "react"

export const TimerContext = React.createContext({
  elapsedSeconds: null,
  noteId: null,
  noteTimerId: null,
  startTimer: () => {},
  stopTimer: () => {},
})
