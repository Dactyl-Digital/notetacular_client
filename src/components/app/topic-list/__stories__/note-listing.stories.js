import React from "react"
import styled from "styled-components"
import { action } from "@storybook/addon-actions"
import NoteListing from "../note-listing"
import ResourceListing from "../../../shared/resource-listing"

const Container = styled.div`
  width: 40rem;
`

const noteData = {
  title: "Note1",
  tags: ["Rhythm", "Harmony", "Random"],
  noteContent: null,
}

export default {
  component: NoteListing,
  title: "NoteListing",
}

export const noteListing = () => <NoteListing note={noteData}></NoteListing>
export const resourceNoteListing = () => (
  <Container>
    <ResourceListing type="NOTE" title={noteData.title} tags={noteData.tags} />
  </Container>
)
// export const emoji = () => (
//   <Button onClick={action("clicked")}>
//     <span role="img" aria-label="so cool">
//       😀 😎 👍 💯
//     </span>
//   </Button>
// )
