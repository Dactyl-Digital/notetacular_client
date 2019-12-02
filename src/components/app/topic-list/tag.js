import React from "react"
import styled from "styled-components"
import XIcon from "../../shared/icons/x-icon"

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.4rem 0.4rem;
  width: 6.4rem;
  min-width: 6.4rem;
  border-radius: 25px;
  font-family: "Blinker", sans-serif;
  color: #fcfcfc;
  text-shadow: 0.1rem 0.1rem #1b7171;
  background: #11eef6;
  margin-right: 1rem;

  p {
    margin: 0.1rem;
  }

  svg {
    width: 0.8rem;
    height: 0.8rem;
  }
`

const Tag = ({ children }) => (
  <Container>
    <p>{children}</p>
    <XIcon />
  </Container>
)

export default Tag
