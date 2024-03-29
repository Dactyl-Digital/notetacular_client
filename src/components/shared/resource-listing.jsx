import React, { useRef, useEffect, lazy, Suspense } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { useNotebookActions } from "../../hooks/commands/useNotebookActions"
import { useSubCategoryActions } from "../../hooks/commands/useSubCategoryActions"
import { useTopicActions } from "../../hooks/commands/useTopicActions"
import { useNoteActions } from "../../hooks/commands/useNoteActions"
import Tags from "../app/topic-list/tags"
import TrashIcon from "./icons/trash-icon"
import ArrowIcon from "./icons/arrow-icon"
import { useScrollState } from "./resource-providers/scroll-provider"
import { useActiveListItemState } from "./resource-providers/active-list-item-provider"
import { onResourceLoadScrollIntoView } from "../app/helpers"
const NoteList = lazy(() => import("../app/topic-list/note-list"))
// SOLUTION!!! -> To the quill "document is undefined" at gatsby build time!!!
// NOTE: Causes an error when running in dev though... -> UPDATE: Had to use
// the Suspense component to make it work.
// const NoteList = React.lazy(() => import("../app/topic-list/note-list"))
// import NoteList from "../app/topic-list/note-list"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  min-width: 26rem;
  height: 4.6rem;
  border-radius: 5px;
  transition: box-shadow 0.4s, transform 0.4s ease-in-out;
  margin-top: 2rem;
  padding-right: 1.8rem;
  transform: ${props => props.active && "translateY(-0.05rem)"};
  box-shadow: ${props =>
    props.active && "0rem 0.1rem 1rem rgba(17, 238, 246, 30%)"};
  background: ${props => props.type === "NOTE" && "#11EEF6"};

  &:hover {
    transform: translateY(-0.05rem);
    box-shadow: ${props =>
      props.type === "NOTE"
        ? `0rem 0.1rem 1rem rgba(27, 113, 113, 30%)`
        : `0rem 0.1rem 1rem rgba(17, 238, 246, 30%)`};
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
    font-size: 1.4rem;
    color: ${props => (props.type === "NOTE" ? "#fcfcfc" : "#11eef6")};
    color: ${props =>
      props.type === "NOTE"
        ? `0.1rem 0.1rem #1b7171`
        : `0.1rem 0.1rem #1b7171`};
    text-shadow: 0.1rem 0.1rem #1b7171;
    margin: 0;
    margin-left: 1.6rem;
    min-width: 11rem;
    width: 11rem;
    max-width: 11rem;
    /* border: 2px solid #222; */
  }

  #title-and-tags {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 22.4rem;
    max-width: 32.4rem;
    /* border: 2px solid blue; */
  }

  .title-container {
    position: relative;
    max-width: 11rem;
    overflow: hidden;
    white-space: nowrap;
    padding: 0.1rem 0;
  }

  .title-container:before {
    content: "";
    position: absolute;
    z-index: 8999;
    top: 0;
    left: 1.8rem;
    width: 12rem;
    height: 2.2rem;
  }

  h3 {
    &:hover {
      animation: slide-text 5s infinite;
    }
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
    }
  }

  #icons {
    display: flex;

    svg {
      margin-left: 1rem;
    }
  }
`

const ResourceListing = ({
  id,
  type,
  title,
  link,
  tags,
  topics,
  notebookId,
  subCategoryId,
  topicId,
  noteId,
  handleDelete,
  showEditor,
  handleArrowClick,
  // active,
  index,
  // setActiveDisabled,
  // scrollTop,
  // setActiveCircle,
  showNotes,
  setShowNotes,
  handleDeleteNote,
}) => {
  const { scrollTop, setActiveItemScrolledTo } = useScrollState()
  const {
    activeCircle,
    setActiveCircle,
    setActiveDisabled,
    setSetActiveDisabled,
  } = useActiveListItemState()

  const { deleteNotebook } = useNotebookActions()
  const { deleteSubCategory } = useSubCategoryActions()
  const { deleteTopic } = useTopicActions()
  const { deleteNote } = useNoteActions()
  // const [toggled, setToggled] = useState(false)
  // const [titleRightPosition, setTitleRightPosition] = useState(null)
  const listingEl = useRef(null)
  const titleRef = useRef(null)

  // TODO: Find a more suitable place to move this... Temporarily replacing
  // this from the sub-cat-list component, as it no longer has access to activeCircle
  const moveActiveIntoView = () => {
    let hash
    if (typeof window !== "undefined") {
      hash = window.location.hash
    }
    if (hash && !activeCircle.active) {
      const id = hash.slice(1, hash.length)
      onResourceLoadScrollIntoView(id, setSetActiveDisabled)
    }
  }

  useEffect(() => {
    moveActiveIntoView()
    setActiveItemScrolledTo({
      type,
      resourceType: "NOTE",
      setActiveDisabled,
      setActiveCircle,
      el: listingEl.current,
      title,
      index,
    })
  }, [scrollTop])

  return (
    // When scrolling.... the activeCircle should
    // be set... Where should the scroll listener go.
    // In the notebook-list, sub-category-list... etc.
    // and pass that down as a prop to be checked against.
    <>
      <Container
        id={id}
        ref={listingEl}
        type={type}
        active={activeCircle.active === title}
        // active={active}
        // titleRightPosition={titleRightPosition}
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
          {type === "NOTE" && (
            <Tags tags={tags} type={type} topicId={topicId} noteId={noteId} />
          )}
        </div>
        <div id="icons">
          {/* TODO: Implement delete capability */}
          <div
            onClick={() => {
              if (type === "NOTEBOOK") {
                // TODO... Still need to implement the redux actions for this.
                // Also, when deleting a ntoe with the editor open... there's a
                // useEffect on mount that posts update content which will cause
                // an error on the backend because it's a deleted note now...
                // Fix that.
                deleteNotebook({ notebook_id: notebookId })
              }
              if (type === "SUB_CATEGORY") {
                deleteSubCategory({
                  notebook_id: notebookId,
                  sub_category_id: subCategoryId,
                })
              }
              if (type === "TOPIC") {
                deleteTopic({
                  sub_category_id: subCategoryId,
                  topic_id: topicId,
                })
              }
              if (type === "NOTE") {
                handleDeleteNote(() =>
                  deleteNote({
                    topic_id: topicId,
                    note_id: noteId,
                  })
                )
              }
            }}
          >
            <TrashIcon />
          </div>
          {type === "TOPIC" || type === "NOTE" ? (
            <div
              // TODO: fix, because this is messy
              onClick={
                handleArrowClick
                  ? handleArrowClick
                  : () => setShowNotes(!showNotes)
              }
            >
              <ArrowIcon toggled={showNotes || showEditor} />
            </div>
          ) : null}
        </div>
      </Container>
      {type === "TOPIC" && showNotes && (
        <Suspense fallback={<div>Loading...</div>}>
          <NoteList
            topics={topics}
            topicId={topicId}
            subCategoryId={subCategoryId}
            showNotes={showNotes}
          />
        </Suspense>
      )}
    </>
  )
}

export default ResourceListing // React.memo(ResourceListing)
