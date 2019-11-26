import React from "react"
import styled from "styled-components"
import Tags from "./tags"
import Editor from "./editor"
import dropDownIcon from "../../../assets/icons/right-chevron.svg"

const Container = styled.div`
  width: 80vw;
  min-width: 14rem;
  max-width: 32rem;
  height: 5rem;
  margin-bottom: 2rem;
  border-radius: 3px;
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 30%);

  .note-listing-control-bar {
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

const NoteListing = ({ note: { title, tags, noteContent } }) => (
  <Container>
    <div className="note-listing-control-bar">
      <div>
        <h1>{title}</h1>
      </div>
      <Tags tags={tags} />
      <div className="drop-down-icon">
        <img src={dropDownIcon} />
      </div>
    </div>
    {/* TODO: create toggle for showing the editor */}
    <Editor noteContent={noteContent} />
  </Container>
)

export default NoteListing
