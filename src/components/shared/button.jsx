import React from "react"
import styled from "styled-components"

const StyledButton = styled.button`
  padding: 0.6rem 1.6rem;
  padding: ${props => (props.size === "SMALL" ? "0.4rem 1.2rem" : null)};
  margin-left: ${props => (props.size === "SMALL" ? "2rem" : null)};
  border-radius: 25px;
  font-size: 1.4rem;
  font-size: ${props => (props.size === "SMALL" ? "1rem" : null)};
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

const Button = ({ children, type, size, handleClick }) => {
  return (
    <StyledButton type={type} size={size} onClick={handleClick}>
      <span>{children}</span>
    </StyledButton>
  )
}

export default Button
