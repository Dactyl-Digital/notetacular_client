import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"

const Container = styled.div`
  position: absolute;
  z-index: 9002;
  bottom: 0;
  right: 0;
  width: 8rem;
  height: 8rem;

  background: rgba(0, 0, 0, 30%);
  #timer-controls {
    position: sticky;
    top: 0;
    border: 2px solid #222;
  }

  #btns {
    display: flex;

    button {
      margin: 0;
    }
  }
`

// const Overlay = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   position: absolute;
//   top: 0;
//   left: 0;
//   z-index: 9001;
//   width: 100vw;
//   height: 100vh;
//   overflow: hidden;
//   background: rgba(17, 238, 246, 70%);
// `

// Use a ternary operator to make sure that the document object is defined
const portalRoot =
  typeof document !== `undefined` ? document.getElementById("portal") : null

const TimerModal = ({
  children,
  elapsedSeconds,
  activeTimer,
  startTimer,
  pauseTimer,
  stopTimer,
}) => {
  const [el, setEl] = useState(null)
  const [timerRunning, setTimerRunning] = useState(true)

  useEffect(() => {
    // Use a ternary operator to make sure that the document object is defined
    const div =
      typeof document !== `undefined` ? document.createElement("div") : null
    setEl(div)

    if (portalRoot) {
      portalRoot.appendChild(div)

      if (el) {
        return () => {
          portalRoot.removeChild(el)
        }
      }
    }
  }, [])

  // Check that this.el is not null before using ReactDOM.createPortal
  if (el) {
    return (
      <>
        {ReactDOM.createPortal(
          <Container>
            <div id="timer-controls">Timer Modal Present! - {children}</div>
            <div id="btns">
              <button
                onClick={() => {
                  if (!timerRunning) {
                    startTimer({
                      currentElapsedSeconds: elapsedSeconds,
                      noteId: activeTimer.noteId,
                      noteTimerId: activeTimer.noteTimerId,
                    })
                    setTimerRunning(!timerRunning)
                  }
                }}
              >
                Start
              </button>
              <button
                onClick={() => {
                  if (timerRunning) {
                    pauseTimer()
                    setTimerRunning(!timerRunning)
                  }
                }}
              >
                Pause
              </button>
              <button
                onClick={() => {
                  if (timerRunning) {
                    stopTimer()
                    setTimerRunning(!timerRunning)
                  }
                }}
              >
                Stop
              </button>
            </div>
          </Container>,
          el
        )}
      </>
    )
  } else {
    return null
  }
}

export default TimerModal
