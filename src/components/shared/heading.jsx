import React from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  h1 {
    font-family: "Blinker", sans-serif;
    font-weight: 400;
    color: #11eef6;
    text-shadow: 0.13rem 0.13rem #1b7171;
  }
`

const Heading = ({ title }) => {
  return (
    <Container>
      <h1>{title}</h1>
      <div>Search Icon</div>
    </Container>
  )
}

export default Heading

// The Grey: #656565
