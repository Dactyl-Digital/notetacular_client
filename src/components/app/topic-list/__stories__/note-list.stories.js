import React from "react"
import { action } from "@storybook/addon-actions"
import NoteList from "../note-list"

const notes = [
  {
    title: "Note1",
    tags: ["Rhythm", "Harmony", "Random"],
    noteContent: null,
  },
  {
    title: "Note2",
    tags: ["Rhythm", "Harmony", "Random"],
    noteContent: null,
  },
  {
    title: "Note3",
    tags: ["Rhythm", "Harmony", "Random"],
    noteContent: null,
  },
]

export default {
  component: NoteList,
  title: "NoteList",
}

export const emptyNoteList = () => <NoteList notes={[]}></NoteList>
export const hydratedNoteList = () => <NoteList notes={notes}></NoteList>

// export const emoji = () => (
//   <Button onClick={action("clicked")}>
//     <span role="img" aria-label="so cool">
//       😀 😎 👍 💯
//     </span>
//   </Button>
// )
