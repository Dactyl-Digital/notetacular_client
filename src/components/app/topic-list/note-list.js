import React, { useState, useEffect } from "react"
import styled from "styled-components"
import NoteListing from "./note-listing"
import { useTopic } from "../../../hooks/queries/useTopic"
import { useNote } from "../../../hooks/queries/useNote"
import { useNoteActions } from "../../../hooks/commands/useNoteActions"
import CreateResourceModal from "../../shared/create-resource-modal"
import Button from "../../shared/button"
import StyledForm from "../../shared/styled-form"

const Container = styled.div`
  /* button {
    opacity: 0%;
    transform: translateY(-20%);
    transition: opacity 0.6s, transform 0.8s ease-in-out;
    opacity: ${props => props.toggled && `100%`};
    transform: ${props => props.toggled && `translateY(0%)`};
  } */
`

const NoteList = ({ topics, topicId, subCategoryId, toggled }) => {
  const { parentTopicsOfNotes } = useNote()
  const { createNote, listNotes } = useNoteActions()
  const [title, setTitle] = useState("")

  const notes = topics[topicId].notes
  const noteIdList = Array.isArray(notes) ? notes : []

  useEffect(() => {
    if (parentTopicsOfNotes.hasOwnProperty(topicId)) {
      // Still more notes available on the backend.
      if (!parentTopicsOfNotes[topicId].notesPaginationEnd) {
        listNotes({
          offset: parentTopicsOfNotes[topicId].listOffset,
          note_id_list: noteIdList,
        })
      }
    } else {
      if (noteIdList.length > 0) {
        listNotes({
          offset: 0,
          note_id_list: noteIdList,
        })
      }
    }
  }, [])

  const handleCreateNewNote = () => {
    createNote({
      title,
      order: noteIdList.length,
      topic_id: topicId,
      sub_category_id: subCategoryId,
    })
    setTitle("")
  }

  return (
    <Container data-testid="note-list" toggled={toggled}>
      <CreateResourceModal action="Create" resource="Note" buttonType="NORMAL">
        {/* TODO: Create a separate component for this form. */}
        {toggleShowModal => (
          <StyledForm
            onSubmit={e => {
              e.preventDefault()
              handleCreateNewNote()
              toggleShowModal(false)
            }}
          >
            <div id="form-fields">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div id="form-button">
              <Button type="CREATE" size="SMALL">
                Submit!
              </Button>
            </div>
          </StyledForm>
        )}
      </CreateResourceModal>
      <div className="note-list">
        {parentTopicsOfNotes.hasOwnProperty(topicId) &&
          noteIdList.map((noteId, idx) => {
            if (parentTopicsOfNotes[topicId].notes.hasOwnProperty(noteId)) {
              return (
                <NoteListing
                  idx={idx}
                  toggled={toggled}
                  key={`${topicId}-${noteId}`}
                  note={parentTopicsOfNotes[topicId].notes[noteId]}
                  topicId={topics[topicId].id}
                  subCategoryId={subCategoryId}
                />
              )
            }
          })}
      </div>
    </Container>
  )
}

export default React.memo(NoteList)
