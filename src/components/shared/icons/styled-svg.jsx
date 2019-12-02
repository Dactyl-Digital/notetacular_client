import React from "react"
import styled from "styled-components"

const StyledSvg = styled.svg`
  width: 1.2rem;
  height: 1.2rem;
  fill: #656565;

  &:hover {
    fill: #f78764;
    cursor: pointer;
  }

  transform: ${props => (props.type === "ARROW" ? `rotateZ(90deg)` : null)};
`

export default StyledSvg
