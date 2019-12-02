import React from "react"
import { action } from "@storybook/addon-actions"
import Tags from "../tags"

export default {
  component: Tags,
  title: "Tags",
}

export const tags = () => (
  <Tags tags={["Rhythm", "Harmony", "Random", "Hippo"]}></Tags>
)

// export const emoji = () => (
//   <Button onClick={action("clicked")}>
//     <span role="img" aria-label="so cool">
//       😀 😎 👍 💯
//     </span>
//   </Button>
// )
