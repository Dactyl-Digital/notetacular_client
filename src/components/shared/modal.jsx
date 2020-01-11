import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"
import Button from "./button"

const Container = styled.div`
  margin-top: 1.6rem;
  margin-top: ${props => props.resource === "Timers" && 0};
`

const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* TODO: Position searchbar towards the top. */
  align-items: ${props => props.resource === "Search" && "flex-start"};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9001;
  width: 100vw;
  height: 100vh;
  background: rgba(17, 238, 246, 70%);
  overflow-x: hidden;
`

// Use a ternary operator to make sure that the document object is defined
let portalRoot =
  typeof document !== "undefined" ? document.getElementById("portal") : null

const Modal = ({
  children,
  resource,
  IconComponent,
  buttonType,
  onModalClose,
}) => {
  const [el, setEl] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const toggleShowModal = () => setShowModal(!showModal)

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
      <Container id="modal" resource={resource}>
        {buttonType === "ICON" && (
          <div className="toggle-modal-btn" onClick={toggleShowModal}>
            <IconComponent />
          </div>
        )}
        {buttonType === "NORMAL" && (
          <Button type="CREATE" handleClick={toggleShowModal}>
            Create {resource}
          </Button>
        )}
        {buttonType === "SMALL" && (
          <Button
            type="CREATE"
            size="SMALL"
            handleClick={toggleShowModal}
            removeMargin={resource === "Tags"}
          >
            Add {resource}
          </Button>
        )}
        {showModal
          ? ReactDOM.createPortal(
              <Overlay
                id="overlay"
                onClick={({ target: { id } }) =>
                  id === "overlay" && toggleShowModal()
                }
              >
                {children(toggleShowModal)}
              </Overlay>,
              el
            )
          : null}
      </Container>
    )
  } else {
    return null
  }
}

export default Modal
