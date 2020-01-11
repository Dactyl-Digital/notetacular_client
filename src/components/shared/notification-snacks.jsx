import React from "react"
import styled from "styled-components"

const Container = styled.div`
  position: absolute;
  top: 2rem;
  left: 50%;
  vertical-align: center;
  background: ${props => (props.type === "SUCCESS" ? "#11EEF6" : "#FF5555")};
  padding: 0.4rem 1.2rem;
  border-radius: 50px;
  box-shadow: 0rem 0.1rem 1rem rgba(27, 113, 113, 30%);
  /* TODO: Animate this bitch in. */

  p {
    display: block;
    margin: 0;
    font-size: 1rem;
    font-family: "Blinker", sans-serif;
    font-weight: 800;
    color: #fcfcfc;
    text-shadow: 0.15rem 0.15rem
      ${props => (props.type === "SUCCESS" ? "#1B7171" : "#5e0c0c")};
  }
`

const NotificationSnack = ({ message, type }) => (
  <Container type={type}>
    <p>{message}</p>
  </Container>
)

const NotificationSnacks = ({ snacks }) =>
  snacks.map(({ message, type }) => (
    <NotificationSnack message={message} type={type} />
  ))

export default NotificationSnacks
