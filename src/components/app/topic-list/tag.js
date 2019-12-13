import React from "react"
import styled from "styled-components"
import XIcon from "../../shared/icons/x-icon"
import { useTopicActions } from "../../../hooks/commands/useTopicActions"
import { useNoteActions } from "../../../hooks/commands/useNoteActions"

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.4rem 0.4rem;
  width: 6.4rem;
  min-width: 6.4rem;
  border-radius: 25px;
  font-family: "Blinker", sans-serif;
  color: #fcfcfc;
  text-shadow: 0.1rem 0.1rem #1b7171;
  background: #11eef6;
  background: ${props => (props.type === "NOTE" ? "#fcfcfc" : null)};
  margin-right: 1rem;

  p {
    margin: 0.1rem;
    color: #fcfcfc;
    color: ${props => (props.type === "NOTE" ? "#11EEF6" : null)};
    font-size: 1.2rem;
  }

  svg {
    min-width: 1rem;
    width: 1rem;
    height: 1rem;
  }
`

const Tag = ({ children, type, topicId, noteId }) => {
  const { removeTopicTag } = useTopicActions()
  const { removeNoteTag } = useNoteActions()

  return (
    <Container type={type}>
      <p>{children}</p>
      <div
        onClick={() => {
          if (type === "TOPIC")
            removeTopicTag({ topic_id: topicId, tag: children })
          if (type === "NOTE") removeNoteTag({ note_id: noteId, tag: children })
        }}
      >
        <XIcon />
      </div>
    </Container>
  )
}

export default Tag
