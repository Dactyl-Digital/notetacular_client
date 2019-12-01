import React from "react"
import styled from "styled-components"
import TopicListing from "./topic-listing"
import Heading from "../../shared/heading"
import Sidebar from "../../shared/sidebar"

const Container = styled.div`
  display: flex;

  #main-content {
    /* TODO: For now this at least looks good on large screens... */
    padding: 0 8vw;
    padding-top: 2rem;
    width: 100%;
  }
`

const TopicList = () => (
  <Container>
    <Sidebar />
    <div id="main-content">
      <Heading title="Sub Categories" />
      <TopicListing
        title="Rhythm"
        tags={["Harmony", "Melody", "Random"]}
        // notes={notes}
      />
      <TopicListing
        title="Tempo"
        tags={["Harmony", "Melody", "Random"]}
        // notes={notes}
      />
    </div>
  </Container>
)

export default TopicList
