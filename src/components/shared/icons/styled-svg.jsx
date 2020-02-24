import React from "react"
import styled from "styled-components"

const StyledSvg = styled.svg`
  width: 1.2rem;
  height: 1.2rem;
  fill: #656565;
  fill: ${props => props.color && `${props.color}`};
  margin-right: ${props => props.marginRight && `${props.marginRight}rem`};

  g {
    position: relative;
    width: ${props => props.type === "CLOCK" && `4rem`};
    height: ${props => props.type === "CLOCK" && `4rem`};
  }

  &:hover {
    cursor: pointer;
  }

  transform: ${props => (props.type === "ARROW" ? `rotateZ(90deg)` : null)};
  transition: transform 0.4s ease-in-out;
  transform: ${props =>
    props.type === "ARROW" && props.toggled ? `rotateZ(270deg)` : null};

  transform: ${props => (props.arrowType === "NEXT" ? `rotateZ(0deg)` : null)};
  transform: ${props =>
    props.arrowType === "PREV" ? `rotateZ(180deg)` : null};
`

export default StyledSvg
