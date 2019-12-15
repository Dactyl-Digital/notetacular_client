import React, { useEffect } from "react"
import styled from "styled-components"
import { useNote } from "../../../hooks/queries/useNote"
import { useNoteTimerActions } from "../../../hooks/commands/useNoteTimerActions"
import { useNoteTimer } from "../../../hooks/queries/useNoteTimer"
import pencilIcon from "../../../assets/icons/pencil-edit-button.svg"
import bookIcon from "../../../assets/icons/open-book.svg"
import trashIcon from "../../../assets/icons/bin.svg"
import CreateResourceModal from "../../shared/create-resource-modal"
import Button from "../../shared/button"
import StyledForm from "../../shared/styled-form"
import NoteTimers from "./note-timers"

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

const TimersContainer = styled.div`
  min-height: 16rem;
  height: 16rem;
  overflow-y: scroll;
`

const Options = ({
  readOnly,
  noteId,
  note_timer_id_list,
  handleOptionClick,
}) => {
  const { parentTopicsOfNotes } = useNote()
  const { parentNotesOfNoteTimers } = useNoteTimer()
  const { createNoteTimer, listNoteTimers } = useNoteTimerActions()

  console.log("what is note_timer_id_list:")
  console.log(note_timer_id_list)
  // console.log("what is topics in noteList?")
  // console.log(topics)
  // const notes = topics[topicId].notes
  // const noteIdList = Array.isArray(notes) ? notes : []

  // useEffect(() => {
  //   console.log("what is the noteIdList in noteList:")
  //   console.log(noteIdList)
  //   if (parentTopicsOfNotes.hasOwnProperty(topicId)) {
  //     // Still more notes available on the backend.
  //     if (!parentTopicsOfNotes[topicId].notesPaginationEnd) {
  //       listNotes({
  //         offset: parentTopicsOfNotes[topicId].listOffset,
  //         note_id_list: noteIdList,
  //       })
  //     }
  //   } else {
  //     listNotes({
  //       offset: 0,
  //       note_id_list: noteIdList,
  //     })
  //   }
  // }, [])

  const noteTimers = parentNotesOfNoteTimers[noteId].note_timers
  const keys = Object.keys(noteTimers)
  const noteTimersLength = keys.length

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
          resource="Timers"
          buttonType="ICON"
          IconComponent={() => <div>TimerIcon</div>}
          addAction={() => {
            createNoteTimer({
              timer_count: noteTimersLength + 1,
              note_id: noteId,
            })
          }}
        >
          {/* TODO: Create a separate component for this form. */}
          {_toggleShowModal => {
            return (
              <TimersContainer>
                {/* TODO: Fix all of this prop drilling with context.... About 4/5 levels deep now. */}
                <NoteTimers
                  noteId={noteId}
                  note_timer_id_list={note_timer_id_list}
                />
              </TimersContainer>
            )
          }}
        </CreateResourceModal>
      </div>
    </Container>
  )
}

export default Options
