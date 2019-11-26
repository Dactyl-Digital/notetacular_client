import React from "react"
import NoteListing from "./note-listing"

const NoteList = ({ notes }) => (
  <div
    style={{
      display: "flex",
      flex: "1",
      justifyContent: "space-between",
      borderBottom: "1px solid #d1c1e0",
    }}
  >
    {notes.length > 0 ? notes.map(note => <NoteListing note={note} />) : null}
  </div>
)

export default NoteList
