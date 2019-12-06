import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Quill from "quill"
import Options from "./options"
import OptionsIcon from "../../shared/icons/options-icon"
import "./editor.css"

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 12rem;

  .ql-toolbar {
    display: ${props => (props.readOnly ? `none` : `block`)};
  }

  .ql-editor {
    min-height: 10rem;
  }

  .options-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 9001;
    top: -1rem;
    left: -1rem;
    padding: 0.6rem;
    border: 0.1rem solid #fcfcfc;
    border-radius: 25px;
    background: ${props => (props.showOptions ? `#11eef6` : `#111`)};
    transition: transform 0.4s ease-in-out;

    svg {
      fill: #fcfcfc;
    }

    &:hover {
      background: #11eef6;
      transform: scale(1.2);
    }
  }
`

const initializeQuillEditor = readOnly => {
  // Quill stuff
  const toolbarOptions = [
    [{ font: [] }],
    ["bold", "italic", "underline", "strike"],
    // (background/color) dropdown with defaults from theme
    [{ header: "1" }, { header: "2" }, { color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }, { indent: "-1" }, { indent: "+1" }],
    ["image", "video", "formula", "code-block", "link"],
  ]

  const options = {
    debug: "info",
    modules: {
      // TODO: Why the puck isn't highlight.js available at this point,
      // even though it's included in the layout.js Helmet component.
      syntax: false,
      // NOTE: Even though this is set to false... The formula toolbar option
      // still works.. What the puck gives?
      formula: false,
      toolbar: readOnly ? null : toolbarOptions,
    },
    // formats: ["header"],
    placeholder: "Compose an epic...",
    readOnly: readOnly,
    theme: "snow",
  }
  const quill = new Quill("#editor", options)
  return quill
}

// i.e. this is really the method that will POST editor JSON structure to server.
const checkEditorState = quill => {
  // console.log("Quill editor state: ", this.state.editor.getContents());
  // NOTE:
  // This needs to be stored as the text which will be searchable by PostgreSQL.
  console.log("this.state.quill.editor.scroll.domNode.innerText:")
  // TODO: Trim excessive whitespace from blocks of text that span across lines.
  console.log(quill.editor.scroll.domNode.innerText)
  // NOTE:
  // This needs to be stored in the database to facilitate rehydrating the editor.
  console.log("Quill contents ", JSON.stringify(quill.getContents()))
}

const Editor = ({ noteContent }) => {
  const [showOptions, setShowOptions] = useState(false)
  const [readOnly, setReadOnly] = useState(false)
  const [quill, setQuill] = useState(null)

  useEffect(() => {
    if (quill === null) {
      const editor = initializeQuillEditor(readOnly)
      // NOTE: For setting content retrieved from the api
      if (noteContent) {
        editor.setContents(noteContent)
      }
      setQuill(editor)
    } else {
      quill.readOnly = readOnly
    }
  }, [readOnly])

  const handleOptionClick = option => {
    if (option === "TOGGLE_READ_ONLY") setReadOnly(!readOnly)
    if (option === "DELETE")
      console.log("Implement are you sure? Followed by API delete to backend.")
  }

  console.log(`readOnly: ${readOnly}`)

  return (
    <Container readOnly={readOnly} showOptions={showOptions}>
      <div>
        <button
          className="options-btn"
          onClick={() => setShowOptions(!showOptions)}
        >
          <OptionsIcon />
        </button>
      </div>
      {showOptions ? (
        <Options readOnly={readOnly} handleOptionClick={handleOptionClick} />
      ) : null}
      <div id="editor" />
      {/* <button onClick={() => checkEditorState(quill)}>Check State!</button> */}
    </Container>
  )
}

export default Editor
