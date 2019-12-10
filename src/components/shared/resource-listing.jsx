import React, { useRef, useState, useEffect } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
// TODO: More Tags into /shared
import Tags from "../app/topic-list/tags"
import NoteList from "../app/topic-list/note-list"
import TrashIcon from "./icons/trash-icon"
import ArrowIcon from "./icons/arrow-icon"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  /* width: 40rem; */
  width: 100%;
  height: 4.6rem;
  border-radius: 5px;
  transition: box-shadow 0.4s, transform 0.4s ease-in-out;
  margin-top: 2rem;
  padding: 0 1.8rem;
  transform: ${props => props.active && "scale(1.005)"};
  box-shadow: ${props =>
    props.active && "0rem 0.1rem 1rem rgba(17, 238, 246, 30%)"};
  background: ${props => props.type === "NOTE" && "#11EEF6"};

  &:hover {
    transform: ${props => props.type !== "NOTE" && `scale(1.005)`};
    box-shadow: ${props =>
      props.type !== "NOTE" && ` 0rem 0.1rem 1rem rgba(17, 238, 246, 30%)`};
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
    color: ${props => (props.type === "NOTE" ? "#fcfcfc" : "#11eef6")};
    color: ${props =>
      props.type === "NOTE"
        ? `0.1rem 0.1rem #1b7171`
        : `0.1rem 0.1rem #1b7171`};
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
  topics,
  topicId,
  noteId,
  handleDelete,
  handleArrowClick,
  active,
  index,
  setActiveDisabled,
  scrollTop,
  setActiveCircle,
}) => {
  const [showNotes, setShowNotes] = useState(false)
  const listingEl = useRef(null)

  useEffect(() => {
    if (setActiveDisabled) return
    const elementTop = listingEl.current.getBoundingClientRect().top
    if (elementTop > -60 && elementTop < 60) {
      setActiveCircle({ active: title, activePosition: index })
    }
  }, [scrollTop])

  return (
    // When scrolling.... the activeCircle should
    // be set... Where should the scroll listener go.
    // In the notebook-list, sub-category-list... etc.
    // and pass that down as a prop to be checked against.
    <>
      <Container id={title} ref={listingEl} type={type} active={active}>
        <div id="title-and-tags">
          {type === "TOPIC" || type === "NOTE" ? (
            <h3>{title}</h3>
          ) : (
            <Link to={`/app/${link}`}>
              <h3>{title}</h3>
            </Link>
          )}
          {(type === "TOPIC" || type === "NOTE") && <Tags tags={tags} />}
        </div>
        <div id="icons">
          {/* TODO: Implement delete capability */}
          <TrashIcon />
          {type === "TOPIC" || type === "NOTE" ? (
            <div
              // TODO: fix, because this is messy
              onClick={
                handleArrowClick
                  ? handleArrowClick
                  : () => setShowNotes(!showNotes)
              }
            >
              <ArrowIcon />
            </div>
          ) : null}
        </div>
      </Container>
      {type === "TOPIC" && showNotes && (
        <NoteList topics={topics} topicId={topicId} />
      )}
    </>
  )
}

export default ResourceListing
