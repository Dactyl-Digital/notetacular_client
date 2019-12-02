import React from "react"
import styled from "styled-components"

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border: 2px solid #222;

  /* .nav-item {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  } */

  .scroll-link {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    text-decoration: none;
    font-family: "Blinker", sans-serif;
    font-weight: 400;
    font-size: 1.3rem;
    color: #fcfcfc;
    text-shadow: 0.07rem 0.07rem #1b7171;
  }

  /* TODO: Will need to create unique ids for each of thes ecircles, so that */
  /* the active one and all of its preceding elements may be styled dynamically. */
  .circle {
    position: relative;
    width: 1rem;
    height: 1rem;
    margin-right: 1rem;
    border-radius: 50px;
    border: 0.2rem solid #fcfcfc;
  }

  .circle:after {
    content: "";
    position: absolute;
    bottom: -1.8rem;
    /* NOTE: This is questionable... Wonder how it'll look across browsers. */
    left: 35%;
    width: 0.18rem;
    height: 1.8rem;
    background: #fcfcfc;
  }

  .circle-last-child:after {
    border: 0;
    width: 0;
    height: 0;
    background: lime;
  }
`

// Will receive the resourceList object (i.e. notebooks, subCategories, topics) from redux state and the Object.keys array as props
const CircleScrollNav = ({ keys, resourceList }) => (
  <Nav>
    {keys.map((key, i) => (
      // <span className="nav-item">
      <a className="scroll-link" href={`#${resourceList[key].title}`}>
        <div
          className={
            i === keys.length - 1 ? `circle circle-last-child` : `circle`
          }
        ></div>
        <span>{resourceList[key].title}</span>
      </a>
      // </span>
    ))}
  </Nav>
)

export default CircleScrollNav
