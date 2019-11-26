import React from "react"
import TopicListing from "./topic-listing"

// TODO:
// Dummy data to facilitate Storybook workflow
const notes = [
  {
    title: "Note1 Title",
    tags: ["Harmony", "Melody", "Random"],
    noteContent:
      "Lorem ipsum dolor sit amet, consectetur adpiscing elit \
                  Proin faucibus dapibus elit ut varius. Aenean consequat \
                  ornare condimentum. Vivamus mauris lorem...",
  },
  {
    title: "Note2 Title",
    tags: ["Harmony", "Melody", "Random"],
    noteContent:
      "Lorem ipsum dolor sit amet, consectetur adpiscing elit \
                  Proin faucibus dapibus elit ut varius. Aenean consequat \
                  ornare condimentum. Vivamus mauris lorem...",
  },
]

const TopicList = ({ subCategoryTitle }) => (
  <div
    style={{
      display: "flex",
      flex: "1",
      justifyContent: "space-between",
      borderBottom: "1px solid #d1c1e0",
    }}
  >
    <div>
      <h1>{subCategoryTitle}</h1>
      <div>Search Icon</div>
    </div>
    <TopicListing
      title="Rhythm"
      tags={["Harmony", "Melody", "Random"]}
      notes={notes}
    />
    <TopicListing title="Tempo" />
  </div>
)

export default TopicList
