import React, { useState, useEffect } from "react"
import NoteListing from "./note-listing"
import { useTopic } from "../../../hooks/queries/useTopic"
import { useNote } from "../../../hooks/queries/useNote"
import { useNoteActions } from "../../../hooks/commands/useNoteActions"
import CreateResourceModal from "../../shared/create-resource-modal"

const NoteList = ({ topics, topicId }) => {
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
      listNotes({
        offset: 0,
        note_id_list: noteIdList,
      })
    }
  }, [])

  const handleCreateNewNote = () => {
    createNote({ title, order: noteIdList.length, topic_id: topicId })
    setTitle("")
  }

  return (
    <>
      <CreateResourceModal resource="Note">
        {toggleShowModal => (
          <form
            onSubmit={e => {
              e.preventDefault()
              handleCreateNewNote()
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
            {/* TODO: Optional Description textarea */}
            <button>Submit!</button>
          </form>
        )}
      </CreateResourceModal>
      <div id="note-list">
        {parentTopicsOfNotes.hasOwnProperty(topicId) &&
          noteIdList.map(noteId => {
            console.log("iterating through noteIdList")
            console.log(parentTopicsOfNotes)
            // console.log("what do I get accessing: notes[key]")
            // console.log(notes[topicId])
            // console.log("and what is noteIdList: ")
            // console.log(noteIdList)
            // console.log("what do I get accessing: notes[key][noteId]")
            // console.log(notes[topicId][noteId])
            if (parentTopicsOfNotes[topicId].notes.hasOwnProperty(noteId)) {
              console.log(
                "THE NOTE: ",
                parentTopicsOfNotes[topicId].notes[noteId]
              )
              return (
                <NoteListing
                  key={`${topicId}-${noteId}`}
                  note={parentTopicsOfNotes[topicId].notes[noteId]}
                  topicId={topics[topicId].id}
                />
              )
            }
          })}
      </div>
    </>
  )
}

export default NoteList
