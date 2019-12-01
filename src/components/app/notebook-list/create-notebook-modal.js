import React, { useState } from "react"
import styled from "styled-components"
import { useNotebookActions } from "../../../hooks/commands/useNotebookActions"
import Modal from "../../shared/modal"

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

const CreateNotebookModal = () => {
  const { createNotebook } = useNotebookActions()
  const [title, setTitle] = useState("")

  const handleCreateNewNotebook = () => {
    createNotebook({ title })
    setTitle("")
  }

  return (
    <Modal resource="Notebook">
      {toggleShowModal => (
        <Container>
          <button id="close-modal-btn" onClick={toggleShowModal}>
            Close
          </button>
          <form
            onSubmit={e => {
              e.preventDefault()
              handleCreateNewNotebook()
              toggleShowModal(false)
            }}
          >
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <button>Submit!</button>
          </form>
        </Container>
      )}
    </Modal>
  )
}

export default CreateNotebookModal
