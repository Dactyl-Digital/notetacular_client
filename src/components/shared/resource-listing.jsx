import React, { useRef, useEffect } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
// TODO: More Tags into /shared
import Tags from "../app/topic-list/tags"
import TrashIcon from "./icons/trash-icon"
import ArrowIcon from "./icons/arrow-icon"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 40rem;
  height: 4.6rem;
  border-radius: 5px;
  transition: box-shadow 0.4s, transform 0.4s ease-in-out;
  margin-top: 2rem;
  padding: 0 1.8rem;

  &:hover {
    transform: scale(1.005);
    box-shadow: 0rem 0.1rem 1rem rgba(17, 238, 246, 30%);
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0.6rem;
    background: #11eef6;
    border-radius: 5px 0 0 5px;
  }

  a {
    text-decoration: none;
  }

  h3 {
    font-family: "Blinker", sans-serif;
    font-weight: 400;
    font-size: 1.8rem;
    color: #11eef6;
    text-shadow: 0.1rem 0.1rem #1b7171;
    margin: 0;
  }

  #title-and-tags {
    display: flex;
    justify-content: space-between;
    min-width: 22.4rem;
    max-width: 22.4rem;
  }

  #icons {
    display: flex;

    svg {
      margin-left: 1rem;
    }
  }
`

const ResourceListing = ({
  type,
  title,
  link,
  tags,
  handleDelete,
  handleArrowClick,
  index,
  setActiveCircle,
  updateElementTopList,
  scrollTopHeight,
  currentElTop,
  setCurrentElTop,
}) => {
  const listingEl = useRef(null)

  // {top: 928.9630126953125, title: "PandaTwo!"}
  useEffect(() => {
    // console.log("WTF IS BOUNDING CLIENT RECT: ", title)
    // console.log(listingEl.current.getBoundingClientRect())
    const elTop = listingEl.current.getBoundingClientRect().top
    if (elTop > -60 && elTop < 60) {
      setActiveCircle({ active: title, activePosition: index })
    }
    // console.log("elTop: ", elTop)
    // console.log("scrollTop: ", scrollTop)
    // console.log("currentElTop.top: ", currentElTop.top)
    // const scrollProgress =
    //   scrollTopHeight.scrollHeight - scrollTopHeight.scrollTop
    // if (currentElTop.top === null) {
    //   setCurrentElTop({ top: elTop + scrollProgress, title: title })
    // }
    // if (elTop > 0) {
    //   const elPosition = elTop + scrollProgress
    //   const elPositionScrollDelta = elPosition - scrollProgress
    //   const currentElPositionScrollDelta = currentElTop.top - scrollProgress
    //   console.log("elPositionScrollDelta: ", elPositionScrollDelta)
    //   console.log(
    //     "currentElPositionScrollDelta: ",
    //     currentElPositionScrollDelta
    //   )
    //   if (elPositionScrollDelta < currentElPositionScrollDelta) {
    //     console.log("setting currentElTop")
    //     console.log({ top: elTop + scrollProgress, title: title })
    //     setCurrentElTop({ top: elTop + scrollProgress, title: title })
    //   }
    // }
  })

  return (
    // When scrolling.... the activeCircle should
    // be set... Where should the scroll listener go.
    // In the notebook-list, sub-category-list... etc.
    // and pass that down as a prop to be checked against.
    <Container id={title} ref={listingEl}>
      <div id="title-and-tags">
        {type === "NOTE" ? (
          <h3>{title}</h3>
        ) : (
          <Link to={`/app/${link}`}>
            <h3>{title}</h3>
          </Link>
        )}
        {type === "TOPIC" || type === "NOTE" ? <Tags tags={tags} /> : null}
      </div>
      <div id="icons">
        {/* TODO: Implement delete capability */}
        <TrashIcon />
        {type === "TOPIC" || type === "NOTE" ? (
          <div onClick={handleArrowClick}>
            <ArrowIcon />
          </div>
        ) : null}
      </div>
    </Container>
  )
}

export default ResourceListing
