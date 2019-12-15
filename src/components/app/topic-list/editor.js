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

const captureSaveEvent = quill => persistNoteContent => e => {
  if (
    (window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) &&
    e.keyCode == 83
  ) {
    e.preventDefault()
    saveEditorContent(quill, persistNoteContent)
  }
}

const handleConfirmLeave = e => {
  e.preventDefault()
  const msg = "Make sure you've saved your work before leaving!"
  e.returnValue = msg
  return msg
}

const saveEditorContent = (quill, persistNoteContent) => {
  persistNoteContent({
    content_text: quill.editor.scroll.domNode.innerText,
    content_markdown: quill.getContents(),
  })
}

const initializeQuillEditor = (editorId, readOnly) => {
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
  const quill = new Quill(`#${editorId}`, options)
  return quill
}

const Editor = ({
  noteId,
  note_timer_id_list,
  noteContent,
  persistNoteContent,
  editorId,
}) => {
  // const { updateNoteTimer } = useNoteTimerActions()
  const [showOptions, setShowOptions] = useState(false)
  const [readOnly, setReadOnly] = useState(false)
  // const [elapsedSeconds, setElapsedSeconds] = useState(null)
  // const [activeTimer, setActiveTimer] = useState({
  //   noteId: null,
  //   noteTimerId: null,
  // })
  const [quill, setQuill] = useState(null)

  useEffect(() => {
    if (quill === null) {
      const editor = initializeQuillEditor(editorId, readOnly)
      // For setting the content_markdown retrieved from the API
      if (noteContent) {
        editor.setContents(noteContent)
      }
      setQuill(editor)
    } else {
      quill.readOnly = readOnly
    }

    let handleSave
    if (quill) {
      handleSave = captureSaveEvent(quill)(persistNoteContent)
      quill.root.addEventListener("keydown", handleSave)
    }
    window.addEventListener("beforeunload", handleConfirmLeave)

    return () => {
      window.removeEventListener("beforeunload", handleConfirmLeave)
      if (quill) {
        quill.root.removeEventListener("keydown", handleSave)
        saveEditorContent(quill, persistNoteContent)
      }
    }
  }, [quill, readOnly])

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
        <Options
          noteId={noteId}
          note_timer_id_list={note_timer_id_list}
          readOnly={readOnly}
          handleOptionClick={handleOptionClick}
        />
      ) : null}
      <div id={editorId} />
    </Container>
  )
}

export default Editor
