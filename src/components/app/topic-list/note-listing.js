import React, { useState } from "react"
import styled from "styled-components"
import { useNoteActions } from "../../../hooks/commands/useNoteActions"
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
  /* overflow: hidden; */

  transform: translateY(-100%);
  opacity: 0%;
  transition: opacity 0.6s, transform 0.8s ease-in-out;
  transform: ${props => props.toggled && `translateY(0%)`};
  opacity: ${props => props.toggled && `100%`};
`

const NoteListing = ({
  idx,
  toggled,
  subCategoryId,
  topicId,
  note: { id, title, tags, content_markdown, note_timers },
}) => {
  const { updateNoteContent } = useNoteActions()
  const [showEditor, setShowEditor] = useState(false)

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
    <Container className="note-listing" idx={idx} toggled={toggled}>
      {/* TODO: Implement API PUT to save text editor contents to the
        database/store it in redux. Otherwise the editor will be clear when
        showEditor is toggled. */}
      <ResourceListing
        type="NOTE"
        title={title}
        tags={tags}
        noteId={id}
        topicId={topicId}
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
