import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"
import Button from "../../shared/button"

const Container = styled.div`
  position: absolute;
  z-index: 9001;
  bottom: 3rem;
  right: 3rem;
  width: 10rem;
  height: 6rem;

  #timer-visible-toggle {
    position: relative;
    top: 0;
    right: -5.4rem;
  }

  #timer-container {
    display: ${props => (props.timerVisible ? "flex" : "none")};
    flex-direction: column;

    background: #fcfcfc;
    border-radius: 5px;
    box-shadow: 0rem 0.1rem 1rem rgba(17, 238, 246, 30%);

    #timer-display {
      display: ${props => (props.timerVisible ? "flex" : "none")};
      justify-content: center;
      align-items: center;
      padding: 1rem;
      font-family: "Blinker", sans-serif;
      font-size: 1.2rem;
      font-weight: 600;
      color: #969464;
    }

    #timer-controls {
      display: ${props => (props.timerVisible ? "flex" : "none")};
      justify-content: center;
      width: 100%;
      padding-bottom: 1rem;
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
let portalRoot =
  typeof document !== "undefined" ? document.getElementById("portal") : null

const TimerModal = ({
  children,
  elapsedSeconds,
  activeTimer,
  startTimer,
  pauseTimer,
  stopTimer,
}) => {
  const [el, setEl] = useState(null)
  const [timerVisible, setTimerVisible] = useState(true)
  const [timerRunning, setTimerRunning] = useState(true)

  useEffect(() => {
    // Use a ternary operator to make sure that the document object is defined
    let div = document.createElement("div")
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
          <Container timerVisible={timerVisible}>
            {timerVisible ? (
              <button
                id="timer-visible-toggle"
                onClick={() => setTimerVisible(false)}
              >
                Hide Timer
              </button>
            ) : (
              <button
                id="timer-visible-toggle"
                onClick={() => setTimerVisible(true)}
              >
                Show Timer
              </button>
            )}
            <div id="timer-container">
              <div id="timer-display">{children}</div>
              <div id="timer-controls">
                {/* <Button
                type="CREATE"
                size="SMALL"
                handleClick={() => {
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
                Start!
              </Button> */}
                {/* <button
                onClick={() => {
                  if (timerRunning) {
                    pauseTimer()
                    setTimerRunning(!timerRunning)
                  }
                }}
              >
                Pause
              </button> */}
                <Button
                  size="SMALL"
                  removeMargin={true}
                  handleClick={() => {
                    if (timerRunning) {
                      stopTimer()
                      setTimerRunning(!timerRunning)
                    }
                  }}
                >
                  Stop!
                </Button>
              </div>
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
