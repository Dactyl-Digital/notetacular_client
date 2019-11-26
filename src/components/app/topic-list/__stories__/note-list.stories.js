import React from "react"
import { action } from "@storybook/addon-actions"
import NoteList from "../note-list.js"

const notes = []

export default {
  component: NoteList,
  title: "NoteList",
}

export const emptyNoteList = () => <NoteList notes={[]}></NoteList>
// export const hydratedNoteList = () => <NoteList notes={notes}></NoteList>

// export const emoji = () => (
//   <Button onClick={action("clicked")}>
//     <span role="img" aria-label="so cool">
//       😀 😎 👍 💯
//     </span>
//   </Button>
// )
