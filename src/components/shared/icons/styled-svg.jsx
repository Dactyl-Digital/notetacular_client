import React from "react"
import styled from "styled-components"

const StyledSvg = styled.svg`
  position: relative;
  width: 1.2rem;
  height: 1.2rem;
  fill: #656565;
  fill: ${props => props.color && `${props.color}`};
  margin-right: ${props => props.marginRight && `${props.marginRight}rem`};

  g {
    width: ${props => props.type === "CLOCK" && `4rem`};
    height: ${props => props.type === "CLOCK" && `4rem`};
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 1rem;
    height: 1rem;
    background: #656565;
    /* opacity: 0.5; */
  }

  &:hover {
    /* fill: #f78764; */
    cursor: pointer;
  }

  transform: ${props => (props.type === "ARROW" ? `rotateZ(90deg)` : null)};
  transition: transform 0.4s ease-in-out;
  transform: ${props =>
    props.type === "ARROW" && props.toggled ? `rotateZ(270deg)` : null};
`

export default StyledSvg
