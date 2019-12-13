import React, { useState } from "react"
import styled from "styled-components"
import Modal from "./modal"

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 40vw;
  min-width: 18rem;
  max-width: 28rem;
  height: 40vh;
  min-height: 18rem;
  max-height: 28rem;
  background: #fcfcfc;
  border-radius: 5px;
  box-shadow: 0rem 0.1rem 1rem rgba(255, 255, 255, 70%);

  #close-modal-btn {
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 1rem;
    margin-right: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
  }
`

const CreateResourceModal = ({
  children,
  resource,
  IconComponent,
  buttonType,
}) => {
  return (
    <Modal
      resource={resource}
      IconComponent={IconComponent}
      buttonType={buttonType}
    >
      {toggleShowModal => (
        <Container>
          <button id="close-modal-btn" onClick={toggleShowModal}>
            Close
          </button>
          {children(toggleShowModal)}
        </Container>
      )}
    </Modal>
  )
}

export default CreateResourceModal
