import React from "react"
import styled from "styled-components"
import Options from "./options"
import CircleScrollNav from "./circle-scroll-nav"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 16rem;
  height: 100vh;
  padding-top: 2rem;
  background: #11eef6;
  overflow-y: scroll;

  h4 {
    font-size: 1.4rem;
    font-family: "Lexend Exa", sans-serif;
    color: #fcfcfc;
    text-shadow: 0.13rem 0.13rem #1b7171;
  }
`

const Sidebar = ({ keys, resourceList }) => {
  return (
    <Container>
      {/* <h4>Notastical</h4> */}
      <nav>
        <Options />
        <CircleScrollNav keys={keys} resourceList={resourceList} />
      </nav>
    </Container>
  )
}

export default React.memo(Sidebar)
