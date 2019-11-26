import React from "react"
import Tags from "./tags"
import NoteList from "./note-list"

const TopicListing = ({ title, tags, notes }) => (
  <div>
    <div
      style={{
        display: "flex",
        flex: "1",
        justifyContent: "space-between",
        borderBottom: "1px solid #d1c1e0",
      }}
    >
      <div>
        <h3>{title}</h3>
      </div>
      <Tags tags={tags} />
      <div>DropDownArrow Icon</div>
    </div>
    <NoteList notes={notes} />
  </div>
)

export default TopicListing
