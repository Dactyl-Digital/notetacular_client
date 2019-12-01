import React from "react"
import styled from "styled-components"

const StyledButton = styled.button`
  padding: 0.6rem 1.6rem;
  border-radius: 25px;
  font-size: 1.4rem;
  font-family: "Blinker", sans-serif;
  font-weight: 800;
  color: #fcfcfc;
  background: ${props => (props.type === "CREATE" ? "#11EEF6" : "#FF5555")};
  box-shadow: 0rem 0.1rem 1rem rgba(27, 113, 113, 30%);

  span {
    text-shadow: 0.15rem 0.15rem
      ${props => (props.type === "CREATE" ? "#1B7171" : "#5E0C0C")};
  }
`

const Button = ({ children, type, handleClick }) => {
  return (
    <StyledButton type={type} onClick={handleClick}>
      <span>{children}</span>
    </StyledButton>
  )
}

export default Button
