import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import NoteListing from "./note-listing"
import { CREATE_NOTE, LIST_NOTES } from "../../../store/actions/ui"
import { useUi } from "../../../hooks/queries/useUi"
// import { useTopic } from "../../../hooks/queries/useTopic"
import { useNote } from "../../../hooks/queries/useNote"
import { useNoteActions } from "../../../hooks/commands/useNoteActions"
import { useNotifications } from "../../shared/notification-snacks/notification-provider"
import CreateResourceModal from "../../shared/create-resource-modal"
import Button from "../../shared/button"
import StyledForm from "../../shared/styled-form"
import ScrollProvider from "../../shared/resource-providers/scroll-provider"
import { checkFormSubmissionErrors } from "../helpers"

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
  addNotification,
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
        addNotification({
          key: "CREATE_NOTE_SUCCESS",
          notification: {
            message: "Note successfully created!",
            type: "SUCCESS",
            notifiedAt: Date.now(),
          },
        })
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
        {createNoteError &&
          title.length < 4 &&
          // TODO: Works in this case... because there will only ever be one.
          // But how will I handle this for the signup/login form... or the
          // tag creation form.
          checkFormSubmissionErrors({
            error: createNoteError,
            notificationKey: "CREATE_NOTE_ERROR",
            addNotification,
            toggleShowModal,
            renderHtml: message => <p className="input-error">{message}</p>,
          })}
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
  const noteListRef = useRef(null)
  const { loading, loadingResource } = useUi()
  const { parentTopicsOfNotes, noteListError, createNoteError } = useNote()
  const { createNote, listNotes, clearCreateNoteError } = useNoteActions()
  const { addNotification } = useNotifications()
  const [title, setTitle] = useState("")
  const [fetchNotes, setFetchNotes] = useState(false)

  const { notes } = topics[topicId]
  const noteIdList = Array.isArray(notes) ? notes : []

  // dependency inject:
  // - the listRef ("actually using #main-content as the hook for the scrollListener should suffice.")
  // - the "LIST_RESOURCE" string for the loadingResource predicate check.
  const handleScroll = e => {
    if (loading && loadingResource === "LIST_NOTES") {
      e.preventDefault()
    }
    const { clientHeight } = e.target
    const { bottom } = noteListRef.current.getBoundingClientRect()

    if (bottom < clientHeight && !loading) {
      // Closure being a bitch again. Because the eventListener
      // is set up in the useEffect hook... And no updates occur.
      // When the trigger occurs to load new notes, this will still be empty.
      // listNotes({
      //   offset: parentTopicsOfNotes[topicId].listOffset,
      //   note_id_list: noteIdList,
      // })
      // SOLUTION: Going to use a useState hook, to trigger loading new notes.
      setFetchNotes(true)
      setTimeout(() => {
        setFetchNotes(false)
      }, 2000)
    }
  }

  useEffect(() => {
    if (noteListError) {
      return addNotification({
        key: "NOTE_LIST_ERROR",
        notification: {
          message: noteListError.message,
          type: "ERROR",
          notifiedAt: Date.now(),
        },
      })
    }

    // The case where no notes have been fetched yet.
    if (noteIdList.length > 0 && !parentTopicsOfNotes.hasOwnProperty(topicId)) {
      listNotes({
        topicId,
        offset: 0,
        note_id_list: noteIdList,
      })
      // NOTE: kinda hacky... using fetchNotes because I ran into a closure issue
      // when trying to use parentTopicsOfNotes[topicId].listOffset from within the handler.
      // But this successfully implements scroll loading the notes.
    } else if (
      fetchNotes &&
      parentTopicsOfNotes.hasOwnProperty(topicId) &&
      !parentTopicsOfNotes[topicId].notesPaginationEnd
    ) {
      console.log("WTF IS NOTES PAGINATION END?!?!?")
      console.log(parentTopicsOfNotes[topicId].notesPaginationEnd)
      listNotes({
        topicId,
        offset: parentTopicsOfNotes[topicId].listOffset,
        note_id_list: noteIdList,
      })
    }
  }, [fetchNotes])

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

  return (
    <Container data-testid="note-list" showNotes={showNotes}>
      <CreateResourceModal action="Create" resource="Note" buttonType="NORMAL">
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
              addNotification={addNotification}
            />
          </StyledForm>
        )}
      </CreateResourceModal>
      <ScrollProvider listId="main-content" fn={handleScroll}>
        <div
          ref={noteListRef}
          id={`topic-${topicId}-note-list`}
          className="note-list"
        >
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
          {loading && loadingResource === "LIST_NOTES" && <h1>Loading...</h1>}
        </div>
      </ScrollProvider>
    </Container>
  )
}

export default React.memo(NoteList)
