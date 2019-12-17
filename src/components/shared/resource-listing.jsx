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
  /* padding: 0 1.8rem; */
  padding-right: 1.8rem;
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
    z-index: 100;
    height: 100%;
    height: ${props => props.type === "NOTE" && `0%`};
    width: 0.6rem;
    background: #11eef6;
    border-radius: 5px 0 0 5px;
  }
  a {
    text-decoration: none;
  }
  h3 {
    text-overflow: ellipsis;
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
    margin-left: 1.8rem;
  }

  @keyframes slide-text {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(0);
      transform: ${props =>
        props.titleRightPosition &&
        `translateX(${-(props.titleRightPosition - 100)}px)`};
      /* transform: translateX(calc(-200%)); */
    }
  }

  /* .title-container {
    &:hover {
      transform: translateX(calc(200px - 100%));
    }
  } */

  #title-and-tags {
    display: flex;
    justify-content: space-between;
    min-width: 22.4rem;
    max-width: 22.4rem;
  }

  .title-container {
    width: 8rem;
    /* max-height: 2.2rem; */
    overflow-x: hidden;

    white-space: nowrap;
    padding: 0.1rem 0;

    /* transform: translateX(0); */
    /* transition: 8s; */

    /* &:-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none; */
  }

  h3 {
    &:hover {
      animation: slide-text 5s infinite;
      /* transform: translateX(calc(200px - 100%)); */
    }
  }

  #icons {
    display: flex;

    svg {
      margin-left: 1rem;
    }
  }
`

// const Container = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   position: relative;
//   /* width: 40rem; */
//   width: 100%;
//   height: 4.6rem;
//   border-radius: 5px;
//   transition: box-shadow 0.4s, transform 0.4s ease-in-out;
//   margin-top: 2rem;
//   /* padding: 0 1.8rem; */
//   padding-right: 1.8rem;
//   transform: ${props => props.active && "scale(1.005)"};
//   box-shadow: ${props =>
//     props.active && "0rem 0.1rem 1rem rgba(17, 238, 246, 30%)"};
//   background: ${props => props.type === "NOTE" && "#11EEF6"};

//   &:hover {
//     transform: ${props => props.type !== "NOTE" && `scale(1.005)`};
//     box-shadow: ${props =>
//       props.type !== "NOTE" && ` 0rem 0.1rem 1rem rgba(17, 238, 246, 30%)`};
//   }

//   &:before {
//     content: "";
//     position: absolute;
//     z-index: 100;
//     top: 0;
//     left: 0;
//     height: 100%;
//     height: ${props => props.type === "NOTE" && `0%`};
//     width: 0.6rem;
//     background: #11eef6;
//     border-radius: 5px 0 0 5px;
//   }

//   a {
//     text-decoration: none;
//   }

//   h3 {
//     font-family: "Blinker", sans-serif;
//     font-weight: 400;
//     font-size: 1.8rem;
//     color: ${props => (props.type === "NOTE" ? "#fcfcfc" : "#11eef6")};
//     color: ${props =>
//       props.type === "NOTE"
//         ? `0.1rem 0.1rem #1b7171`
//         : `0.1rem 0.1rem #1b7171`};
//     text-shadow: 0.1rem 0.1rem #1b7171;
//     margin: 0;
//     margin-left: 1rem;

//     white-space: nowrap;
//     overflow: hidden;
//     /* text-overflow: ${props =>
//       props.titleRightPosition > 144 && `ellipsis`}; */
//     /* text-overflow: ellipsis; */

//     &:hover {
//       /* overflow: ${props => props.titleRightPosition > 144 && `auto`}; */
//       /* text-overflow: ${props => props.titleRightPosition > 144 && `none`}; */
//       color: ${props => props.titleRightPosition > 144 && `lime`};;
//       animation: slide-text 5s infinite;
//     }
//   }

//   @keyframes slide-text {
//     from {
//       /* transform: ${props =>
//         props.titleRightPosition > 144 && `translateX(0)`}; */
//       transform: translateX(0);
//     }
//     to {
//       transform: ${props =>
//         props.titleRightPosition > 144 &&
//         `translateX(${-props.titleRightPosition - 180}px`};
//     }
//   }

//         /* transform: translateX(calc(-200%)); */
//   /* .title-container {
//     &:hover {
//       transform: translateX(calc(200px - 100%));
//     }
//   } */

//   #title-and-tags {
//     display: flex;
//     justify-content: space-between;
//     min-width: 22.4rem;
//     max-width: 22.4rem;
//   }

//   .title-container {
//     width: 8rem;
//     /* NOTE: without this the ResourceListing title
//     will be visible outside  of the div when animating to the left. */
//     overflow-x: hidden;
//     /* border: 2px solid #222; */
//     white-space: nowrap;
//     padding: 0.1rem 0;

//     transform: translateX(0);
//     transition: 8s;

//     /* &:-webkit-scrollbar {
//       display: none;
//     }
//     -ms-overflow-style: none;
//     overflow: -moz-scrollbars-none; */
//   }

//   #icons {
//     display: flex;

//     svg {
//       margin-left: 1rem;
//     }
//   }
// `

const ResourceListing = ({
  type,
  title,
  link,
  tags,
  topics,
  subCategoryId,
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
  const [titleRightPosition, setTitleRightPosition] = useState(null)
  const listingEl = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    if (!titleRightPosition) {
      if (titleRef.current !== null) {
        setTitleRightPosition(titleRef.current.offsetParent.scrollWidth)
      }
    }

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
      <Container
        id={title}
        ref={listingEl}
        type={type}
        active={active}
        titleRightPosition={titleRightPosition}
      >
        <div id="title-and-tags">
          {type === "TOPIC" || type === "NOTE" ? (
            <div className="title-container">
              <h3 ref={titleRef}>{title}</h3>
            </div>
          ) : (
            <Link to={`/app/${link}`}>
              <div className="title-container">
                <h3 ref={titleRef}>{title}</h3>
              </div>
            </Link>
          )}
          {(type === "TOPIC" || type === "NOTE") && (
            <Tags tags={tags} type={type} topicId={topicId} noteId={noteId} />
          )}
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
        <NoteList
          topics={topics}
          topicId={topicId}
          subCategoryId={subCategoryId}
        />
      )}
    </>
  )
}

export default ResourceListing
