import React from "react"
import styled from "styled-components"

const StyledButton = styled.button`
  padding: 0.6rem 1.6rem;
  padding: ${props => props.size === "SMALL" && "0.4rem 1.2rem"};
  padding: ${props => props.size === "EXTRA_SMALL" && "0.1rem 1rem"};
  padding: ${props => props.type === "ADD" && "0.05rem 0.4rem"};
  margin-left: ${props => props.size === "SMALL" && "2rem"};
  margin-left: ${props => props.type === "ADD" && "1rem"};
  margin-left: ${props => props.removeMargin && "0rem"};
  border-radius: 25px;
  font-size: 1.4rem;
  font-size: ${props => props.size === "SMALL" && "1rem"};
  font-size: ${props => props.size === "EXTRA_SMALL" && "1rem"};
  font-family: "Blinker", sans-serif;
  font-weight: 800;
  color: #fcfcfc;
  background: ${props =>
    props.type === "CREATE" || props.type === "ADD" ? "#11EEF6" : "#FF5555"};
  box-shadow: 0rem 0.1rem 1rem rgba(27, 113, 113, 30%);

  &:hover {
    cursor: pointer;
    transition: transform, box-shadow 0.6s;
    transform: translateY(-0.05rem);
    box-shadow: 0rem 0.4rem 1.4rem rgba(27, 113, 113, 30%);
  }

  span {
    display: flex;
    align-items: center;
    text-shadow: 0.15rem 0.15rem
      ${props =>
        props.type === "CREATE" || props.type === "ADD"
          ? "#1B7171"
          : "#5e0c0c"};
  }

  svg {
    width: 0.9rem;
    height: 0.9rem;
  }
`

const Button = ({ children, type, size, removeMargin, handleClick }) => {
  return (
    <StyledButton
      type={type}
      size={size}
      removeMargin={removeMargin}
      onClick={handleClick}
    >
      <span>{children}</span>
    </StyledButton>
  )
}

export default Button
