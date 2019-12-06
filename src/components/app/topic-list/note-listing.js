import React, { useState } from "react"
import styled from "styled-components"
import Tags from "./tags"
import ResourceListing from "../../shared/resource-listing"
import Editor from "./editor"
import dropDownIcon from "../../../assets/icons/right-chevron.svg"

const Container = styled.div`
  /* min-width: 14rem; */
  /* max-width: 40rem; */
  /* height: 100%; */
  width: 100%;
  padding: 0;
  margin: 0;
  /* min-height: 5rem; */
  /* margin-bottom: 2rem; */
  border-radius: 3px;
  /* border: 2px solid #222; */
`

const NoteListing = ({ note: { title, tags, noteContent } }) => {
  const [showEditor, setShowEditor] = useState(false)

  return (
    <Container>
      {/* TODO: Implement API PUT to save text editor contents to the
        database/store it in redux. Otherwise the editor will be clear when
        showEditor is toggled. */}
      <ResourceListing
        type="NOTE"
        title={title}
        tags={tags}
        handleArrowClick={() => setShowEditor(!showEditor)}
      />
      {/* TODO: create toggle for showing the editor */}
      {showEditor ? <Editor noteContent={noteContent} /> : null}
    </Container>
  )
}

export default NoteListing
