import React from "react"
import { action } from "@storybook/addon-actions"
import TopicListing from "../note-listing.js"

// const notes = [
//   {
//     title: "Note1 Title",
//     tags: ["Harmony", "Melody", "Random"],
//     noteContent:
//       "Lorem ipsum dolor sit amet, consectetur adpiscing elit \
//                   Proin faucibus dapibus elit ut varius. Aenean consequat \
//                   ornare condimentum. Vivamus mauris lorem...",
//   },
//   {
//     title: "Note2 Title",
//     tags: ["Harmony", "Melody", "Random"],
//     noteContent:
//       "Lorem ipsum dolor sit amet, consectetur adpiscing elit \
//                   Proin faucibus dapibus elit ut varius. Aenean consequat \
//                   ornare condimentum. Vivamus mauris lorem...",
//   },
// ]

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
  component: TopicListing,
  title: "TopicListing",
}

// TODO: Fix prop drilling like a mofo.
export const topicListing = () => (
  <TopicListing
    title="Functional Programming"
    tags={["HOF", "Closure"]}
    notes={notes}
  ></TopicListing>
)

// export const emoji = () => (
//   <Button onClick={action("clicked")}>
//     <span role="img" aria-label="so cool">
//       😀 😎 👍 💯
//     </span>
//   </Button>
// )
