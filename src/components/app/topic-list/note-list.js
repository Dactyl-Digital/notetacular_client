import React, { useState, useEffect } from "react"
import NoteListing from "./note-listing"
import { useTopic } from "../../../hooks/queries/useTopic"
import { useNote } from "../../../hooks/queries/useNote"
import { useNoteActions } from "../../../hooks/commands/useNoteActions"
import CreateResourceModal from "../../shared/create-resource-modal"

// IMMEDIATE TODO:
// Newly created note's aren't automatically being rendered after successful completion...
// probably not re-rendering upon redux state update... because it's a nested update within a topic of
// the noteReducer's note object?
// Also... The editor renders funky when opening multiple note's dropdowns from top to bottom WTF!
const NoteList = ({ topicId }) => {
  const { topics } = useTopic()
  const { parentTopicsOfNotes } = useNote()
  const { createNote, listNotes } = useNoteActions()
  const [title, setTitle] = useState("")

  const notes = topics[topicId].notes
  // const topicNotesKeyList = Object.keys(notes)
  const noteIdList = Array.isArray(notes) ? notes : []
  // console.log(`noteIdList for topicId-${topicId}`)
  // console.log(noteIdList)

  useEffect(() => {
    // console.log("the topics:")
    // console.log(topics)
    if (noteIdList.length > 0) {
      listNotes({
        offset: 0,
        note_id_list: noteIdList,
      })
    }
  }, [])

  const handleCreateNewNote = () => {
    console.log("the noteIdList: ")
    console.log(noteIdList)
    createNote({ title, order: noteIdList.length, topic_id: topicId })
    setTitle("")
  }

  return (
    <>
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
    </>
  )
}

export default NoteList
