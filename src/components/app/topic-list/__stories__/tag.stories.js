import React from "react"
import { action } from "@storybook/addon-actions"
import Tag from "../tag"

export default {
  component: Tag,
  title: "Tag",
}

export const tag = () => <Tag>Harmony</Tag>
export const tagTwo = () => <Tag>Harmony</Tag>

// export const emoji = () => (
//   <Button onClick={action("clicked")}>
//     <span role="img" aria-label="so cool">
//       😀 😎 👍 💯
//     </span>
//   </Button>
// )
