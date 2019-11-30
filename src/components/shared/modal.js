import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import Button from "./button.js"

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

      return () => {
        portalRoot.removeChild(el)
      }
    }
  }, [])

  // Check that this.el is not null before using ReactDOM.createPortal
  console.log("What is el...")
  console.log(el)
  if (el) {
    return (
      <div>
        <Button type="CREATE" handleClick={toggleShowModal}>
          Create {resource}
        </Button>
        {/* {showModal ? children(toggleShowModal) : null} */}
        {showModal
          ? ReactDOM.createPortal(children(toggleShowModal), el)
          : null}
      </div>
    )
  } else {
    return null
  }
}

export default Modal
