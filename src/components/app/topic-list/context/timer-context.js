import React from "react"

export const TimerContext = React.createContext({
  elapsedSeconds: 0,
  noteId: null,
  noteTimerId: null,
  startTimer: () => {},
  stopTimer: () => {},
})
