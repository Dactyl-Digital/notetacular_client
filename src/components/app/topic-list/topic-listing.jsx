import React, { useState } from "react"
import styled from "styled-components"
import Tags from "./tags"
import NoteList from "./note-list"
import dropDownIcon from "../../../assets/icons/right-chevron.svg"

const Container = styled.div`
  width: 80vw;
  min-width: 14rem;
  max-width: 32rem;
  height: 100%;
  min-height: 5rem;
  margin-bottom: 2rem;
  border-radius: 3px;
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 30%);

  .topic-listing-control-bar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
  }

  .drop-down-icon {
    width: 1.4rem;
    height: 1.4rem;
    transform: rotateZ(90deg);
  }
`

// This has been replaced... by the monster that is ResourceListing
const TopicListing = ({ title, tags, notes }) => {
  const [showNotes, setShowNotes] = useState(false)

  return (
    <Container>
      <div className="topic-listing-control-bar">
        <div>
          <h3>{title}</h3>
        </div>
        <Tags tags={tags} type="TOPIC" />
        <div
          className="drop-down-icon"
          onClick={() => setShowNotes(!showNotes)}
        >
          <img src={dropDownIcon} />
        </div>
      </div>
      {showNotes ? <NoteList notes={notes} /> : null}
    </Container>
  )
}

export default TopicListing
