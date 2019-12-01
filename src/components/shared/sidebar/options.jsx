import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const Container = styled.div`
  display: flex;

  #more-options {
    font-size: 1.2rem;
    font-family: "Blinker", sans-serif;
    color: #fcfcfc;
    text-shadow: 0.13rem 0.13rem #1b7171;
  }
`
// TODO: Should Container be a button... or a div to facilitate the dropdown click?
const Options = () => (
  <Container>
    <span>DDArrow</span>
    <span id="more-options">More Options</span>
  </Container>
)

export default Options
