import React, { useState } from "react"
import styled from "styled-components"
import { useSubCategoryActions } from "../../../hooks/commands/useSubCategoryActions"
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

const CreateSubCategoryModal = ({ notebookId }) => {
  const { createSubCategory } = useSubCategoryActions()
  const [title, setTitle] = useState("")

  const handleCreateNewSubCategory = () => {
    createSubCategory({ title, notebook_id: notebookId })
    setTitle("")
  }

  return (
    <Modal resource="Sub Category">
      {toggleShowModal => (
        <Container>
          <button id="close-modal-btn" onClick={toggleShowModal}>
            Close
          </button>
          {/* TODO: Duplication between the modals...
          Genericize this b so that you can pass in whatever form
          you want. */}
          <form
            onSubmit={e => {
              e.preventDefault()
              handleCreateNewSubCategory()
              toggleShowModal(false)
            }}
          >
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              autofocus="true"
              onChange={e => setTitle(e.target.value)}
            />
            <button>Submit!</button>
          </form>
        </Container>
      )}
    </Modal>
  )
}

export default CreateSubCategoryModal
