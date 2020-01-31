import React, { useEffect } from "react"
import styled from "styled-components"
import { UPDATE_NOTE_CONTENT } from "../../../store/actions/ui"
import { useUi } from "../../../hooks/queries/useUi"
import { useNotifications } from "./notification-provider"

const Container = styled.div`
  position: absolute;
  top: 2rem;
  left: 50%;
  vertical-align: center;
  background: ${props => (props.type === "SUCCESS" ? "#11EEF6" : "#FF5555")};
  padding: 0.4rem 1.2rem;
  border-radius: 50px;
  box-shadow: 0rem 0.1rem 1rem rgba(27, 113, 113, 30%);
  box-shadow: ${props =>
    props.type === "ERROR" && "0rem 0.1rem 1rem rgba(255, 85, 85, 30%)"};

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

const NotificationSnacks = () => {
  const { loadingResource } = useUi()
  const { notifications } = useNotifications()

  useEffect(() => {
    console.log("The loading resource inside NotificationSnacks")
    console.log(loadingResource)
  }, loadingResource)

  if (loadingResource === UPDATE_NOTE_CONTENT) {
    return <NotificationSnack message={"Saving Note!"} type={"SUCCESS"} />
  }

  const keys = Object.keys(notifications)
  if (keys.length > 0) {
    return keys.map(key => {
      const { message, type } = notifications[key]
      return <NotificationSnack message={message} type={type} />
    })
  }
  return null
}

export default NotificationSnacks
