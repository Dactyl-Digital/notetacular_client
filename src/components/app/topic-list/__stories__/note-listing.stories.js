import React from "react"
import { action } from "@storybook/addon-actions"
import NoteListing from "../note-listing.js"

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

// export const emoji = () => (
//   <Button onClick={action("clicked")}>
//     <span role="img" aria-label="so cool">
//       😀 😎 👍 💯
//     </span>
//   </Button>
// )
