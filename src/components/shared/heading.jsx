import React from "react"
import styled from "styled-components"
import Search from "./search"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-width: 26rem;
  padding-right: 1.6rem;

  h1 {
    font-family: "Blinker", sans-serif;
    font-weight: 400;
    color: #11eef6;
    text-shadow: 0.13rem 0.13rem #1b7171;
    margin-bottom: 0;
  }
`

const Heading = ({ title }) => {
  return (
    <>
      <Container>
        <h1>{title}</h1>
        {/* TODO: Last thing to implement for Search
        is to show the clicked searchResults note
        amongst a list of all the other notes associated
        w/ the searchResults notes' topic. */}
        <Search />
      </Container>
    </>
  )
}

export default Heading
