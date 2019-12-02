import React from "react"
import styled from "styled-components"
import { action } from "@storybook/addon-actions"
import NoteListing from "../note-listing"
import ResourceListing from "../../../shared/resource-listing"

const Container = styled.div`
  /* NOTE: ResourceListing will not collapse to be smaller than this width */
  width: 43.5rem;
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

export const noteListing = () => (
  <Container>
    <NoteListing note={noteData}></NoteListing>
  </Container>
)
export const resourceNoteListing = () => (
  <Container>
    <ResourceListing
      type="NOTE"
      title={noteData.title}
      tags={noteData.tags}
      handleArrowClick={() => console.log("Clicked")}
    />
  </Container>
)
// export const emoji = () => (
//   <Button onClick={action("clicked")}>
//     <span role="img" aria-label="so cool">
//       😀 😎 👍 💯
//     </span>
//   </Button>
// )
