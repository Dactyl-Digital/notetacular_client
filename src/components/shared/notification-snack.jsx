import React from "react"

const Container = styled.div`
  background: ${props => (props.type === "SUCCESS" ? "green" : "red")};
  padding: 0.4rem 1.4rem;
`

export default function NotificationSnack({ message, type }) {
  return (
    <Container type={type}>
      <h3>{message}</h3>
    </Container>
  )
}
