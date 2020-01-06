import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { useSubCategory } from "../../../hooks/queries/useSubCategory"
import { useTopic } from "../../../hooks/queries/useTopic"
import { useTopicActions } from "../../../hooks/commands/useTopicActions"
// import TopicListing from "./topic-listing"
import Heading from "../../shared/heading"
import Sidebar from "../../shared/sidebar"
import Timer from "./timer"
import ResourceListing from "../../shared/resource-listing"
import CreateResourceModal from "../../shared/create-resource-modal"
import { ActiveCircleContext } from "../notebook-list"
import Button from "../../shared/button"
import StyledForm from "../../shared/styled-form"

const extractTopicIdRegex = /\d+/
const extractNoteIdRegex = /note-\d+$/

const Container = styled.div`
  display: flex;

  #main-content {
    /* TODO: For now this at least looks good on large screens... */
    padding: 0 8vw;
    padding-top: 2rem;
    width: 100%;
    min-width: 32rem;
    height: 100vh;
    overflow-y: scroll;

    #topic-list {
      margin-bottom: 2rem;
    }
  }
`

const TopicListing = ({
  id,
  title,
  tags,
  index,
  type,
  topics,
  topicId,
  subCategoryId,
  active,
  setActiveDisabled,
  scrollTop,
  setActiveCircle,
  showNoteList,
}) => {
  const [showNotes, setShowNotes] = useState(showNoteList)

  return (
    <ResourceListing
      id={id}
      title={title}
      tags={tags}
      index={index}
      type={type}
      topics={topics}
      topicId={topicId}
      subCategoryId={subCategoryId}
      active={active}
      setActiveDisabled={setActiveDisabled}
      scrollTop={scrollTop}
      setActiveCircle={setActiveCircle}
      showNotes={showNotes}
      setShowNotes={setShowNotes}
    />
  )
}

const TopicList = ({ notebookId, subCategoryId }) => {
  const { parentNotebooksOfSubCategories } = useSubCategory()
  const { parentSubCategoriesOfTopics } = useTopic()
  const { createTopic, listTopics, listSubCategoryTopics } = useTopicActions()
  const [title, setTitle] = useState("")
  const [activeTopic, setActiveTopic] = useState(null)

  const [activeCircle, setActiveCircle] = useState({
    active: null,
    activePosition: 0,
  })
  const [setActiveDisabled, setSetActiveDisabled] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)
  const listEl = useRef(null)

  const scrollIntoViewWhenLoaded = (id) => {
    setTimeout(() => {
      let targetResource = document.getElementById(id)
      console.log("the id:")
      console.log(id)
      console.log("The targetResource:")
      console.log(targetResource)
      // NOTE: scrollIntoView worked.... AND I'm willing to settle with that for now!
      // TODO: CLean this shiz up, uninstall gsap, and add hover style to focused element
      // manage that state -> i.e. it should become the active div, until user scrolls
      // then other divs will be newly selected active divs.
      if(targetResource) {
        targetResource.scrollIntoView()
      } else {
        scrollIntoViewWhenLoaded(id)
      }
    }, 2000)
  }

  // TODO: Genericize this b, make a reusable hook... as this is
  // repeated in notebook-list and sub-category-list
  useEffect(() => {
    let hash
    if (typeof window !== "undefined") {
      hash = window.location.hash
    }
    if (hash && !activeCircle.active) {
      // TODO: IMPLEMENT SCROLL NOTE INTO VIEW... Will need to handle
      // toggling editor
      let id = hash.slice(1, hash.length)
      if (id.match(/topic-[0-9]+-note-[0-9]+/)) {
        const [activeTopicId, ...rest] = id.match(extractTopicIdRegex)
        setActiveTopic(activeTopicId)
        const [noteId, ...restTwo] = id.match(extractNoteIdRegex)
        id = noteId
      }
      scrollIntoViewWhenLoaded(id)
    }
    listEl.current.addEventListener("scroll", handleScroll)

    if (!parentNotebooksOfSubCategories.hasOwnProperty(notebookId)) {
      // NOTE: The case when the user copies and pastes the link into the browser.
      return listSubCategoryTopics({ subCategoryId, limit: 20, offset: 0 })
    }

    const topicIdList = parentNotebooksOfSubCategories.hasOwnProperty(
      notebookId
    )
      ? parentNotebooksOfSubCategories[notebookId].hasOwnProperty(
          "subCategories"
        )
        ? parentNotebooksOfSubCategories[notebookId].subCategories[
            subCategoryId
          ].topics
        : []
      : []

    if (parentSubCategoriesOfTopics.hasOwnProperty(subCategoryId)) {
      if (!parentSubCategoriesOfTopics[subCategoryId].topicsPaginationEnd) {
        listTopics({
          offset: parentSubCategoriesOfTopics[subCategoryId].listOffset,
          topic_id_list: topicIdList,
        })
      }
    } else {
      if (topicIdList.length > 0) {
        listTopics({
          offset: 0,
          topic_id_list: topicIdList,
        })
      }
    }

    return () => {
      listEl.current.removeEventListener("scroll", handleScroll)
    }
  }, [activeCircle])

  const handleScroll = () => {
    setScrollTop(listEl.current.scrollTop)
  }

  const setActive = ({ active, activePosition, clickedNav }) => {
    if (!setActiveDisabled || clickedNav) {
      setActiveCircle({ ...activeCircle, active, activePosition })
      if (clickedNav) {
        setSetActiveDisabled(clickedNav)
      }
      // Necessary to prevent the scroll event from being triggered
      // and resetting a higher ResourceListing as active when scrolled to
      // the bottom of the list. (As the clicked ResourceListing won't be
      // at the top of the viewport and the one that is would be set to active
      // right after the clicked ResourceListing is)
      setTimeout(() => setSetActiveDisabled(false), 1000)
    }
  }

  const handleCreateNewTopic = () => {
    createTopic({ title, sub_category_id: subCategoryId })
    setTitle("")
  }

  // NOTE: This fucking sucks
  const topics = parentSubCategoriesOfTopics.hasOwnProperty(subCategoryId)
    ? parentSubCategoriesOfTopics[subCategoryId].hasOwnProperty("topics")
      ? parentSubCategoriesOfTopics[subCategoryId].topics
      : []
    : []

  const keys = Object.keys(topics)

  return (
    <ActiveCircleContext.Provider
      value={{
        ...activeCircle,
        setActive,
      }}
    >
      <Container data-testid="topic-list-page">
        <Sidebar keys={keys} resourceList={topics} />
        <div id="main-content" ref={listEl}>
          <Heading title="Topics" />
          <CreateResourceModal
            action="Create"
            resource="Topic"
            buttonType="NORMAL"
          >
            {/* TODO: Create a separate component for this form. */}
            {toggleShowModal => (
              <StyledForm
                onSubmit={e => {
                  e.preventDefault()
                  handleCreateNewTopic()
                  toggleShowModal(false)
                }}
              >
                <div className="form-fields">
                  <label htmlFor="title">Title</label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-button">
                  <Button type="CREATE" size="SMALL">
                    Submit!
                  </Button>
                </div>
              </StyledForm>
            )}
          </CreateResourceModal>
          <Timer>
            <div id="topic-list">
              {keys.map((key, i) => {
                return (
                  <TopicListing
                    id={topics[key].title}
                    key={topics[key].id.toString()}
                    title={topics[key].title}
                    tags={topics[key].tags}
                    index={i}
                    type="TOPIC"
                    topics={topics}
                    topicId={topics[key].id}
                    subCategoryId={subCategoryId}
                    active={activeCircle.active === topics[key].title}
                    setActiveDisabled={setActiveDisabled}
                    scrollTop={scrollTop}
                    setActiveCircle={setActiveCircle}
                    showNoteList={topics[key].id.toString() === activeTopic}
                  />
                )
              })}
            </div>
          </Timer>
        </div>
      </Container>
    </ActiveCircleContext.Provider>
  )
}

export default React.memo(TopicList)
