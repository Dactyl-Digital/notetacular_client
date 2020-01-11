import React, { useState, useEffect } from "react"
import styled from "styled-components"
import NoteListing from "./note-listing"
import { CREATE_NOTE, LIST_NOTES } from "../../../store/actions/ui"
import { useUi } from "../../../hooks/queries/useUi"
import { useTopic } from "../../../hooks/queries/useTopic"
import { useNote } from "../../../hooks/queries/useNote"
import { useNoteActions } from "../../../hooks/commands/useNoteActions"
import NotificationSnacks from "../../shared/notification-snacks"
import CreateResourceModal from "../../shared/create-resource-modal"
import Button from "../../shared/button"
import StyledForm from "../../shared/styled-form"
import { createSuccessMessage } from "../helpers"

// TODO (future feature):
// NOTE: Currently, when deleting a note, it'll leave a gap such that
// if you have notes w/ order (in the db) of 0, 1, 2
// and the note with the order "1" is deleted. The other notes will
// have order 0, 2. And the next note created after that will be 3.
// If you want to implement click-and-drag in the future. The above
// will need to be accounted for.
const Container = styled.div`
  /* button {
    opacity: 0%;
    transform: translateY(-20%);
    transition: opacity 0.6s, transform 0.8s ease-in-out;
    opacity: ${props => props.toggled && `100%`};
    transform: ${props => props.toggled && `translateY(0%)`};
  } */
`

const CreateNoteForm = ({
  title,
  setTitle,
  createNoteError,
  toggleShowModal,
  loading,
  showSnacks,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isLoading !== loading) {
      if (createNoteError) {
        setIsLoading(loading)
        return
      } else if (loading === false) {
        toggleShowModal(false)
        setTitle("")
        showSnacks({ message: "Note successfully created!", type: "SUCCESS" })
        setIsLoading(loading)
        return
      }
    }
    setIsLoading(loading)
  }, [isLoading, loading, createNoteError])

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    // TODO: Don't display this if create Note was success.
    // Just show the success/error snackbar as a pop up from the top
    <>
      <div className="form-fields">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        {createNoteError && title.length < 4 && (
          // Works in this case... because there will only ever be one.
          // But how will I handle this for the signup/login form... or the
          // tag creation form.
          <p>{createNoteError.errors[0].message}</p>
        )}
      </div>
      <div className="form-button">
        <Button type="CREATE" size="SMALL">
          Submit!
        </Button>
      </div>
    </>
  )
}

const NoteList = ({ topics, topicId, subCategoryId, showNotes }) => {
  const { loading, loadingResource } = useUi()
  const { parentTopicsOfNotes, createNoteError } = useNote()
  const { createNote, listNotes, clearCreateNoteError } = useNoteActions()
  const [snacks, setSnacks] = useState([])
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
    if (createNoteError) {
      clearCreateNoteError({ response: { data: null } })
    }
    createNote({
      title,
      order: noteIdList.length,
      topic_id: topicId,
      sub_category_id: subCategoryId,
    })
  }

  const showSnacks = newSnack => {
    setSnacks([...snacks, newSnack])
    setTimeout(() => {
      setSnacks([])
    }, 3000)
  }

  return (
    <Container data-testid="note-list" showNotes={showNotes}>
      <NotificationSnacks snacks={snacks} />
      <CreateResourceModal action="Create" resource="Note" buttonType="NORMAL">
        {/* TODO: Create a separate component for this form. */}
        {toggleShowModal => (
          <StyledForm
            onSubmit={e => {
              e.preventDefault()
              handleCreateNewNote()
            }}
          >
            <CreateNoteForm
              title={title}
              setTitle={setTitle}
              createNoteError={createNoteError}
              toggleShowModal={toggleShowModal}
              loading={loadingResource === CREATE_NOTE ? loading : false}
              showSnacks={showSnacks}
            />
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
                  showNotes={showNotes}
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
