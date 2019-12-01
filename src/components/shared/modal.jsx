import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"
import Button from "./button"

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9001;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: rgba(17, 238, 246, 70%);
`

// Use a ternary operator to make sure that the document object is defined
const portalRoot =
  typeof document !== `undefined` ? document.getElementById("portal") : null

const Modal = ({ children, resource }) => {
  const [el, setEl] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const toggleShowModal = () => setShowModal(!showModal)

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
      <div>
        <Button type="CREATE" handleClick={toggleShowModal}>
          Create {resource}
        </Button>
        {/* {showModal ? children(toggleShowModal) : null} */}
        {showModal
          ? ReactDOM.createPortal(
              <Overlay>{children(toggleShowModal)}</Overlay>,
              el
            )
          : null}
      </div>
    )
  } else {
    return null
  }
}

export default Modal
