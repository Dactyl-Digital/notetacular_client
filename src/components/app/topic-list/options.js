import React from "react"
import styled from "styled-components"
import { useNoteTimerActions } from "../../../hooks/commands/useNoteTimerActions"
import pencilIcon from "../../../assets/icons/pencil-edit-button.svg"
import bookIcon from "../../../assets/icons/open-book.svg"
import trashIcon from "../../../assets/icons/bin.svg"
import CreateResourceModal from "../../shared/create-resource-modal"

const Container = styled.div`
  padding: 0.6rem 0;
  border: 2px solid #222;
  width: 100%;
  border-left: 1px solid #aaa;
  border-right: 1px solid #aaa;

  .options-icons-container {
    display: flex;
  }

  .options-icons-container:first-child {
    margin-left: 1rem;
  }

  img {
    width: 1.2rem;
    height: 1.2rem;
    margin-left: 1rem;
  }
`

const Options = ({ readOnly, noteId, handleOptionClick }) => {
  const { createNoteTimer } = useNoteTimerActions()

  return (
    <Container>
      <div className="options-icons-container">
        <div onClick={() => handleOptionClick("TOGGLE_READ_ONLY")}>
          {readOnly ? <img src={pencilIcon} /> : <img src={bookIcon} />}
        </div>
        <div onClick={() => handleOptionClick("DELETE")}>
          <img src={trashIcon} />
        </div>
        <CreateResourceModal
          resource="Topic"
          buttonType="ICON"
          IconComponent={() => <div>TimerIcon</div>}
        >
          {/* TODO: Create a separate component for this form. */}
          {toggleShowModal => (
            <form
              onSubmit={e => {
                e.preventDefault()
                // handleCreateNewNoteTimer()
                createNoteTimer({
                  timer_count: 1,
                  note_id: noteId,
                })
                toggleShowModal(false)
              }}
            >
              {/* <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            /> */}
              <button>Submit!</button>
            </form>
          )}
        </CreateResourceModal>
      </div>
    </Container>
  )
}

export default Options
