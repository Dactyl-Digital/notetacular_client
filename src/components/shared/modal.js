import React, { useState, useEffect } from "react"

export default function Modal({ children, resource }) {
  const [showModal, setShowModal] = useState(false)
  const toggleShowModal = () => setShowModal(!showModal)

  return (
    <div>
      <button onClick={toggleShowModal}>Create {resource}</button>
      {showModal ? children(toggleShowModal) : null}
    </div>
  )
}
