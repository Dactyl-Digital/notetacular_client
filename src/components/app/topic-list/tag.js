import React from "react"
import styled from "styled-components"
import closeIcon from "../../../assets/icons/delete.svg"

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.4rem 0;
  width: 6rem;
  border: 2px solid #222;

  img {
    width: 0.8rem;
    height: 0.8rem;
  }
`

const Tag = ({ children }) => (
  <Container>
    <div>{children}</div>
    <div>
      <img src={closeIcon} />
    </div>
  </Container>
)

export default Tag
