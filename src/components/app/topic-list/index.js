import React from "react"
import styled from "styled-components"
import TopicListing from "./topic-listing"

const Container = styled.div`
  width: 80vw;
`

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
  <Container>
    <div>
      <h1>{subCategoryTitle}</h1>
      <div>Search Icon</div>
    </div>
    <TopicListing
      title="Rhythm"
      tags={["Harmony", "Melody", "Random"]}
      notes={notes}
    />
    <TopicListing
      title="Tempo"
      tags={["Harmony", "Melody", "Random"]}
      notes={notes}
    />
  </Container>
)

export default TopicList
