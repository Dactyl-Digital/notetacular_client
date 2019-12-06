import React from "react"
import styled from "styled-components"
import SearchIcon from "./icons/search-icon"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 1.8rem;

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
    <Container>
      <h1>{title}</h1>
      <SearchIcon />
    </Container>
  )
}

export default Heading
