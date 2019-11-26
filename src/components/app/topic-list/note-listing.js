import React, { useState } from "react"
import styled from "styled-components"
import Tags from "./tags"
import Editor from "./editor"
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

  .note-listing-control-bar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
  }

  .editor-container {
    margin-bottom: 1rem;
    height: 20rem;
    width: 32rem;
    border: 2px solid red;
  }

  .drop-down-icon {
    width: 1.4rem;
    height: 1.4rem;
    transform: rotateZ(90deg);
  }
`

const NoteListing = ({ note: { title, tags, noteContent } }) => {
  const [showEditor, setShowEditor] = useState(false)

  return (
    <Container>
      <div className="note-listing-control-bar">
        <div>
          <h1>{title}</h1>
        </div>
        <Tags tags={tags} />
        {/* TODO: Implement API PUT to save text editor contents to the
        database/store it in redux. Otherwise the editor will be clear when
        showEditor is toggled. */}
        <div
          className="drop-down-icon"
          onClick={() => setShowEditor(!showEditor)}
        >
          <img src={dropDownIcon} />
        </div>
      </div>
      {/* TODO: create toggle for showing the editor */}
      {showEditor ? <Editor noteContent={noteContent} /> : null}
    </Container>
  )
}

export default NoteListing
