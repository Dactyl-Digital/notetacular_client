import React from "react"
import styled from "styled-components"
import { useActiveListItemState } from "../resource-providers/active-list-item-provider"
// import { ActiveCircleContext } from "../../app/notebook-list"

const Nav = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  /* border: 2px solid #222; */

  .scroll-link {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    text-decoration: none;
    font-family: "Blinker", sans-serif;
    font-weight: 400;
    font-size: 1.2rem;
    color: #fcfcfc;
    text-shadow: 0.07rem 0.07rem #1b7171;
  }
`

const A = styled.a`
  /* TODO: Will need to create unique ids for each of thes ecircles, so that */
  /* the active one and all of its preceding elements may be styled dynamically. */
  .circle {
    position: relative;
    width: 1rem;
    height: 1rem;
    margin-right: 1rem;
    border-radius: 50px;
    border: 0.2rem solid #fcfcfc;
    border: ${props =>
      props.currentPosition < props.activePosition && `0.2rem solid #B5B3B3`};
    background: ${props =>
      props.currentPosition === props.activePosition && `#fcfcfc`};
    background: ${props =>
      props.currentPosition < props.activePosition && null};
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
    background: ${props =>
      props.currentPosition < props.activePosition && `#B5B3B3`};
  }

  .circle-last-child:after {
    border: 0;
    width: 0;
    height: 0;
    background: lime;
  }

  .resource-title {
    overflow-x: hidden;
    /* NOTE: removeds overflow just to get rid of the scrollbars */
    padding: 0.05rem 0;
    white-space: nowrap;
    min-width: 6rem;
    max-width: 8rem;
  }
`

// Will receive the resourceList object (i.e. notebooks, subCategories, topics) from redux state and the Object.keys array as props
const CircleScrollNav = props => {
  const { activeCircle, setActive } = useActiveListItemState()

  return (
    <Nav>
      {props.keys.map((key, i) => (
        <A
          className="scroll-link"
          key={`#${props.resourceList[key].title}`}
          href={`#${props.resourceList[key].title}`}
          onClick={() => {
            setActive({
              active: props.resourceList[key].title,
              activePosition: i,
              clickedNav: true,
            })
          }}
          activePosition={activeCircle.activePosition}
          currentPosition={i}
        >
          <div
            className={
              i === props.keys.length - 1
                ? `circle circle-last-child`
                : `circle`
            }
          ></div>
          <span className="resource-title">
            {props.resourceList[key].title}
          </span>
        </A>
      ))}
    </Nav>
  )
}

export default React.memo(CircleScrollNav)
