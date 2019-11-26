import React from "react"
import { action } from "@storybook/addon-actions"
import Editor from "../editor.js"

const delta = {
  ops: [
    { insert: "A code block:" },
    { attributes: { header: 1 }, insert: "\n" },
    { insert: "const num = 1" },
    { attributes: { "code-block": true }, insert: "\n" },
    { insert: "\n" },
    {
      attributes: { background: "#ffff00" },
      insert: "And some highlighted text",
    },
    { insert: "\n" },
  ],
}

export default {
  component: Editor,
  title: "Editor",
}

export const freshEditor = () => <Editor></Editor>
export const hydratedEditor = () => <Editor noteContent={delta}></Editor>

// export const emoji = () => (
//   <Button onClick={action("clicked")}>
//     <span role="img" aria-label="so cool">
//       😀 😎 👍 💯
//     </span>
//   </Button>
// )
