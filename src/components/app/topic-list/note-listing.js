import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useNoteActions } from "../../../hooks/commands/useNoteActions"
import ResourceListing from "../../shared/resource-listing"
import Editor from "./editor"

// IMMEDIATE TODO: Start implementing LOADING states in the UI for the rest of the resources...

const extractNoteIdRegex = /\d+$/

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
  /* overflow: hidden; */

  transform: translateY(-100%);
  opacity: 0%;
  transition: opacity 0.6s, transform 0.8s ease-in-out;
  transform: ${props => props.showNotes && `translateY(0%)`};
  opacity: ${props => props.showNotes && `100%`};
`

const NoteListing = ({
  idx,
  showNotes,
  subCategoryId,
  topicId,
  note: { id, title, tags, content_markdown, note_timers },
}) => {
  const { updateNoteContent } = useNoteActions()
  const [showEditor, setShowEditor] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { hash } = window.location
      if (hash) {
        let hashStr = hash.slice(1, hash.length)
        const [noteId, ...rest] = hashStr.match(extractNoteIdRegex)
        if (id === Number(noteId)) {
          setShowEditor(!showEditor)
        }
      }
    }
  }, [])

  const persistNoteContent = ({ content_text, content_markdown }) => {
    updateNoteContent({
      subCategoryId,
      topicId,
      note_id: id,
      content_text,
      content_markdown,
    })
  }

  return (
    <Container className="note-listing" idx={idx} showNotes={showNotes}>
      {/* TODO: Implement API PUT to save text editor contents to the
        database/store it in redux. Otherwise the editor will be clear when
        showEditor is showNotes. */}
      <ResourceListing
        type="NOTE"
        id={`note-${id}`}
        title={title}
        tags={tags}
        noteId={id}
        topicId={topicId}
        showEditor={showEditor}
        handleArrowClick={() => setShowEditor(!showEditor)}
      />
      {/* TODO: create toggle for showing the editor */}
      {showEditor ? (
        <Editor
          noteId={id}
          note_timer_id_list={note_timers}
          noteContent={content_markdown}
          persistNoteContent={persistNoteContent}
          editorId={`editor-${topicId}-${id}`}
        />
      ) : null}
    </Container>
  )
}

export default React.memo(NoteListing)
