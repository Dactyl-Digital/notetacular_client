import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Options from "./options"
import CircleScrollNav from "./circle-scroll-nav"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 16rem;
  height: 100vh;
  padding-top: 1.2rem;
  background: #11eef6;
  overflow-y: scroll;

  h4 {
    font-size: 1.4rem;
    font-family: "Lexend Exa", sans-serif;
    color: #fcfcfc;
    text-shadow: 0.13rem 0.13rem #1b7171;
  }
`

const Sidebar = ({ keys, resourceList }) => (
  <Container>
    {/* <h4>Notastical</h4> */}
    <nav>
      <Options />
      <CircleScrollNav keys={keys} resourceList={resourceList} />
      <button
        onClick={() => {
          // TODO: Implement useAuthAction -> logoutUser
          // and handle localStorage.removeItem("authenticated") inside
          // of the store.subscribe handleChange function
          localStorage.removeItem("authenticated")
        }}
      >
        Log Out
      </button>
    </nav>
  </Container>
)

export default Sidebar
