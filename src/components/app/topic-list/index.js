import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { useUi } from "../../../hooks/queries/useUi"
import { useSubCategory } from "../../../hooks/queries/useSubCategory"
import { useTopic } from "../../../hooks/queries/useTopic"
import { useTopicActions } from "../../../hooks/commands/useTopicActions"
// import TopicListing from "./topic-listing"
import { CREATE_TOPIC, LIST_TOPICS } from "../../../store/actions/ui"
import { useNotifications } from "../../shared/notification-snacks/notification-provider"
import ScrollProvider from "../../shared/resource-providers/scroll-provider"
import Heading from "../../shared/heading"
import Sidebar from "../../shared/sidebar"
import Timer from "./timer"
import ResourceListing from "../../shared/resource-listing"
import CreateResourceModal from "../../shared/create-resource-modal"
import { ActiveCircleContext } from "../notebook-list"
import Button from "../../shared/button"
import StyledForm from "../../shared/styled-form"
import {
  onResourceLoadScrollIntoView,
  checkFormSubmissionErrors,
} from "../helpers"

const extractTopicIdRegex = /\d+/
const extractNoteIdRegex = /note-\d+$/

const Container = styled.div`
  display: flex;

  #main-content {
    /* TODO: For now this at least looks good on large screens... */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 8vw;
    padding-top: 2rem;
    width: 100%;
    min-width: 32rem;
    height: 100vh;
    overflow-y: scroll;

    #main-content-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      align-self: center;
      width: 100%;
      max-width: 44rem;
      /* border: 2px solid #222; */
    }

    #heading-modal-container {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    #resource-list {
      display: block;
      flex-direction: column;
      align-items: center;
      margin-bottom: 2rem;
      width: 100%;
    }
  }
`

const CreateTopicForm = ({
  title,
  setTitle,
  createTopicError,
  toggleShowModal,
  loading,
  addNotification,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isLoading !== loading) {
      if (createTopicError) {
        setIsLoading(loading)
        return
      } else if (loading === false) {
        toggleShowModal(false)
        setTitle("")

        addNotification({
          key: "CREATE_TOPIC_SUCCESS",
          notification: {
            message: "Topic successfully created!",
            type: "SUCCESS",
          },
        })
        setIsLoading(loading)
        return
      }
    }
    setIsLoading(loading)
  }, [isLoading, loading, createTopicError])

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    // TODO: Don't display this if create Topic was success.
    // Just show the success/error snackbar as a pop up from the top
    <>
      <div className="form-fields">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        {createTopicError &&
          title.length < 4 &&
          // TODO: Works in this case... because there will only ever be one.
          // But how will I handle this for the signup/login form... or the
          // tag creation form.
          checkFormSubmissionErrors({
            error: createTopicError,
            notificationKey: "CREATE_TOPIC_ERROR",
            addNotification,
            toggleShowModal,
            renderHtml: message => <p className="input-error">{message}</p>,
          })}
      </div>
      <div className="form-button">
        <Button type="CREATE" size="SMALL">
          Submit!
        </Button>
      </div>
    </>
  )
}

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
  const { loading, loadingResource } = useUi()
  const { parentNotebooksOfSubCategories } = useSubCategory()
  const {
    parentSubCategoriesOfTopics,
    createTopicError,
    topicListError,
  } = useTopic()
  const {
    createTopic,
    listTopics,
    listSubCategoryTopics,
    clearCreateTopicError,
  } = useTopicActions()
  const { addNotification } = useNotifications()
  const [title, setTitle] = useState("")

  // TODO: I think I meant to use this to open up the topic's note
  // list when the page is navigated to it specifically.
  const [activeTopic, setActiveTopic] = useState(null)

  // TODO: Genericize this b, make a reusable hook... as this is
  // repeated in notebook-list and sub-category-list
  useEffect(() => {
    // let hash
    // if (typeof window !== "undefined") {
    //   hash = window.location.hash
    // }
    // if (hash && !activeCircle.active) {
    //   // TODO: IMPLEMENT SCROLL NOTE INTO VIEW... Will need to handle
    //   // toggling editor
    //   let id = hash.slice(1, hash.length)
    //   onResourceLoadScrollIntoView(id)
    // }
    // listEl.current.addEventListener("scroll", handleScroll)

    if (topicListError) {
      return addNotification({
        key: "TOPIC_LIST_ERROR",
        notification: { message: topicListError.message, type: "ERROR" },
      })
    }

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
  }, [loading, topicListError, createTopicError])

  const handleCreateNewTopic = () => {
    if (createTopicError) {
      clearCreateTopicError({ response: { data: null } })
    }
    createTopic({ title, sub_category_id: subCategoryId })
  }

  // NOTE: This fucking sucks
  const topics = parentSubCategoriesOfTopics.hasOwnProperty(subCategoryId)
    ? parentSubCategoriesOfTopics[subCategoryId].hasOwnProperty("topics")
      ? parentSubCategoriesOfTopics[subCategoryId].topics
      : []
    : []

  const keys = Object.keys(topics)

  return (
    <ScrollProvider listId="main-content">
      <Container data-testid="topic-list-page">
        <Sidebar keys={keys} resourceList={topics} />
        <div id="main-content">
          <div id="main-content-wrapper">
            <div id="heading-modal-container">
              <Heading title="Topics" />
              <CreateResourceModal
                action="Create"
                resource="Topic"
                buttonType="NORMAL"
                handleOnClose={
                  createTopicError &&
                  (() => clearCreateTopicError({ response: { data: null } }))
                }
              >
                {/* TODO: Create a separate component for this form. */}
                {toggleShowModal => (
                  <StyledForm
                    onSubmit={e => {
                      e.preventDefault()
                      handleCreateNewTopic()
                    }}
                  >
                    <CreateTopicForm
                      title={title}
                      setTitle={setTitle}
                      createTopicError={createTopicError}
                      toggleShowModal={toggleShowModal}
                      loading={
                        loadingResource === CREATE_TOPIC ? loading : false
                      }
                      addNotification={addNotification}
                    />
                  </StyledForm>
                )}
              </CreateResourceModal>
            </div>
            <Timer>
              <div id="resource-list">
                {loading && loadingResource === LIST_TOPICS ? (
                  <h1>Loading...</h1>
                ) : (
                  keys.map((key, i) => {
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
                        showNoteList={topics[key].id.toString() === activeTopic}
                      />
                    )
                  })
                )}
              </div>
            </Timer>
          </div>
        </div>
      </Container>
    </ScrollProvider>
  )
}

export default React.memo(TopicList)
