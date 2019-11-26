import React, { useState, useEffect } from "react"
import NoteListing from "./note-listing"

const NoteList = ({ notes }) => {
  const [listOfNotes, setListOfNotes] = useState([])
  const [title, setTitle] = useState("")
  const [showCreateNoteModal, setShowCreateNoteModal] = useState(false)

  useEffect(() => {
    console.log(`The incoming notes in NoteList: ${notes}`)
    if (listOfNotes.length === 0) {
      setListOfNotes(notes)
    }
  }, [listOfNotes])

  const toggleShowCreateNoteModal = () =>
    setShowCreateNoteModal(!showCreateNoteModal)

  const handleCreateNewNote = e => {
    e.preventDefault()
    setListOfNotes([
      ...listOfNotes,
      {
        title: title,
        tags: [],
        noteContent: null,
      },
    ])
    setTitle("")
    setShowCreateNoteModal(!showCreateNoteModal)
  }

  return (
    <div>
      {listOfNotes.length > 0
        ? listOfNotes.map(note => <NoteListing note={note} />)
        : null}
      <button onClick={toggleShowCreateNoteModal}>Create New Note</button>
      {showCreateNoteModal ? (
        <form onSubmit={handleCreateNewNote}>
          <label for="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <button>Submit!</button>
        </form>
      ) : null}
    </div>
  )
}

export default NoteList
