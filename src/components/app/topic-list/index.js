import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { useSubCategory } from "../../../hooks/queries/useSubCategory"
import { useTopic } from "../../../hooks/queries/useTopic"
import { useTopicActions } from "../../../hooks/commands/useTopicActions"
// import TopicListing from "./topic-listing"
import Heading from "../../shared/heading"
import Sidebar from "../../shared/sidebar"
import ResourceListing from "../../shared/resource-listing"
import CreateResourceModal from "../../shared/create-resource-modal"
import { ActiveCircleContext } from "../notebook-list"
import { compareIdentifiers } from "semver"

const Container = styled.div`
  display: flex;

  #main-content {
    /* TODO: For now this at least looks good on large screens... */
    padding: 0 8vw;
    padding-top: 2rem;
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
  }
`

const TopicList = ({ notebookId, subCategoryId }) => {
  const { parentNotebooksOfSubCategories } = useSubCategory()
  const { parentSubCategoriesOfTopics } = useTopic()
  const { createTopic, listTopics } = useTopicActions()
  const [title, setTitle] = useState("")

  const [activeCircle, setActiveCircle] = useState({
    active: null,
    activePosition: 0,
  })
  const [setActiveDisabled, setSetActiveDisabled] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)
  const listEl = useRef(null)

  // // TODO: Genericize this b, make a reusable hook... as this is
  // // repeated in notebook-list and sub-category-list
  // useEffect(() => {
  //   const topicIdList = subCategories[subCategoryId].topics
  //   if (topicIdList.length > 0 && Object.keys(topics).length === 0) {
  //     listTopics({
  //       offset: listTopicsOffset,
  //       topic_id_list: topicIdList,
  //     })
  //   }
  // }, [])

  useEffect(() => {
    const hash = window.location.hash
    if (hash && !activeCircle.active) {
      const id = hash.slice(1, hash.length)
      setTimeout(() => {
        let targetResource = document.getElementById(id)
        // NOTE: scrollIntoView worked.... AND I'm willing to settle with that for now!
        // TODO: CLean this shiz up, uninstall gsap, and add hover style to focused element
        // manage that state -> i.e. it should become the active div, until user scrolls
        // then other divs will be newly selected active divs.
        targetResource.scrollIntoView()
      }, 5000)
    }
    listEl.current.addEventListener("scroll", handleScroll)
    console.log("the notebookId")
    console.log(notebookId)
    const topicIdList =
      parentNotebooksOfSubCategories[notebookId].subCategories[subCategoryId]
        .topics
    // if (topicIdList.length > 0) {
    //   listTopics({
    //     offset: 0,
    //     topic_id_list: topicIdList,
    //   })
    // }

    console.log("the parentSubCategoriesOfTopics in topic-list useEffect")
    console.log(parentSubCategoriesOfTopics)
    console.log("and the subCategoryId")
    console.log(subCategoryId)
    if (parentSubCategoriesOfTopics.hasOwnProperty(subCategoryId)) {
      if (!parentSubCategoriesOfTopics[subCategoryId].topicsPaginationEnd) {
        listTopics({
          offset: parentSubCategoriesOfTopics[subCategoryId].listOffset,
          topic_id_list: topicIdList,
        })
      }
    } else {
      listTopics({
        offset: 0,
        topic_id_list: topicIdList,
      })
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
  console.log("wtf is parentSubCategoriesOfTopics: ")
  console.log(parentSubCategoriesOfTopics)
  const keys = Object.keys(topics)
  console.log("the topic's keys:")
  console.log(keys)

  return (
    <ActiveCircleContext.Provider
      value={{
        ...activeCircle,
        setActive,
      }}
    >
      <Container>
        <Sidebar keys={keys} resourceList={topics} />
        <div id="main-content" ref={listEl}>
          <Heading title="Topics" />
          <CreateResourceModal resource="Topic">
            {/* TODO: Create a separate component for this form. */}
            {toggleShowModal => (
              <form
                onSubmit={e => {
                  e.preventDefault()
                  handleCreateNewTopic()
                  toggleShowModal(false)
                }}
              >
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
                <button>Submit!</button>
              </form>
            )}
          </CreateResourceModal>
          <div id="topic-list">
            {keys.map((key, i) => {
              console.log("the topics: ")
              console.log(topics)
              console.log("the key:")
              console.log(key)
              console.log("the topic @ topics[keys]: ")
              console.log(topics[keys])
              return (
                <ResourceListing
                  key={topics[key].id.toString()}
                  title={topics[key].title}
                  tags={topics[key].tags}
                  index={i}
                  type="TOPIC"
                  // TODO: Need to setup list_topics domain business logic to
                  // actually retrieve tags...
                  // tags={topics[key].tags}
                  topics={topics}
                  topicId={topics[key].id}
                  active={activeCircle.active === topics[key].title}
                  setActiveDisabled={setActiveDisabled}
                  scrollTop={scrollTop}
                  setActiveCircle={setActiveCircle}
                />
              )
            })}
          </div>
        </div>
      </Container>
    </ActiveCircleContext.Provider>
  )
}

export default TopicList
