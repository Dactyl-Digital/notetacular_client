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
  getNestedProperty,
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

// const useListFetchMachine = () => {
//   const [listFetchState, setListFetchState] = useState("FETCH_INITIAL_LIST")

//   const permittedTransitions = {
//     FETCH_INITIAL_LIST: ["AWAITING_LIST_ADDITIONAL"],
//     AWAITING_LIST_ADDITIONAL: ["LIST_ADDITIONAL"],
//     LIST_ADDITIONAL: ["AWAITING_LIST_ADDITIONAL"],
//   }

//   return { listFetchState, transitionListFetchState }
// }

const TopicList = ({ notebookId, subCategoryId }) => {
  const topicListRef = useRef(null)
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
  const [listFetchState, setListFetchState] = useState("FETCH_INITIAL_LIST")

  const permittedTransitions = () => {
    const permitted = {
      FETCH_INITIAL_LIST: ["AWAITING_LIST_ADDITIONAL"],
      AWAITING_LIST_ADDITIONAL: ["LIST_ADDITIONAL"],
      LIST_ADDITIONAL: ["AWAITING_LIST_ADDITIONAL"],
    }

    return (state, transition) => {
      if (permitted[state].indexOf(transition) !== -1) {
        console.log(`setListFetchState(${transition})`)
        setListFetchState(transition)
      }
    }
  }

  const checkPermittedTransition = permittedTransitions()

  const transitionListFetchState = transitionState =>
    checkPermittedTransition(listFetchState, transitionState)

  // TODO: Genericize this b, make a reusable hook... as this is
  // repeated in notebook-list and sub-category-list
  // UPDATE ON THE TODO: Tried the reusable hook thing w/ the state machine setup...
  // Seems as though closure is keeping the state variable the same, meaning it won't
  // transition through the states... Will need to mess around with this later.
  useEffect(() => {
    // Unfucking the fetching resource list logic (Yeah... These are basically the cases.):
    // 1. state = "INITIAL_LOAD" Component mounts, fetch initial page of 20; state transitions to "INITIAL_LIST_FETCHED" (The dispatch function
    //    to fetch the list will differ based on how the user navigates to this page - i.e. clicking through the resources/navigating directly via URL.)
    // 2. state = "INITIAL_LIST_FETCHED", if user scrolls to bottom of the list, an additional 20 resources are fetched from the server;
    //    state transitions to "ADDITIONAL_LIST_FETCHED" (The main thing I need to eliminate is multiple calls being issued upon the user
    //    scrolling down).

    if (topicListError) {
      return addNotification({
        key: "TOPIC_LIST_ERROR",
        notification: { message: topicListError.message, type: "ERROR" },
      })
    } else if (createTopicError) {
      console.log("the create topic errror....")
      console.log(createTopicError)
      return addNotification({
        key: "CREATE_TOPIC_ERROR",
        notification: { message: createTopicError.message, type: "ERROR" },
      })
    }

    const topicIdList = getNestedProperty(
      parentNotebooksOfSubCategories,
      [notebookId, "subCategories", subCategoryId, "topics"],
      "DIRECT_URL_NAVIGATION"
    )

    if (!loading && topicIdList === "DIRECT_URL_NAVIGATION") {
      listSubCategoryTopics({ subCategoryId, limit: 20, offset: 0 })
      transitionListFetchState("AWAITING_LIST_ADDITIONAL")
      return
    }

    if (!loading && listFetchState === "FETCH_INITIAL_LIST") {
      listTopics({
        subCategoryId,
        offset: 0,
        topic_id_list: topicIdList,
      })
      transitionListFetchState("AWAITING_LIST_ADDITIONAL")
      return
    }

    if (
      !loading &&
      parentSubCategoriesOfTopics.hasOwnProperty(subCategoryId) &&
      topicIdList.length > 0 &&
      listFetchState === "LIST_ADDITIONAL"
    ) {
      listTopics({
        subCategoryId,
        offset: parentSubCategoriesOfTopics[subCategoryId].listOffset,
        topic_id_list: topicIdList,
      })
    }
  }, [listFetchState, loading, topicListError, createTopicError])

  const handleCreateNewTopic = () => {
    if (createTopicError) {
      clearCreateTopicError({ response: { data: null } })
    }
    createTopic({ title, sub_category_id: subCategoryId })
  }

  const handleScroll = e => {
    if (loading && loadingResource === "LIST_TOPICS") {
      e.preventDefault()
    }
    const { clientHeight } = e.target
    const { bottom } = topicListRef.current.getBoundingClientRect()

    if (bottom < clientHeight && !loading) {
      // Closure being a bitch again. Because the eventListener
      // is set up in the useEffect hook... And no updates occur.
      // When the trigger occurs to load new notes, this will still be empty.
      // listNotes({
      //   offset: parentTopicsOfNotes[topicId].listOffset,
      //   note_id_list: noteIdList,
      // })
      // SOLUTION: Going to use a useState hook, to trigger loading new notes.

      // NOTE: Really cheating here... as a way to get around listFetchState still
      // being INITIAL_FETCH_LIST when this is finally triggered... damn closures still
      // messing things up.
      setListFetchState("LIST_ADDITIONAL")
      setTimeout(() => {
        setListFetchState("AWAITING_LIST_ADDITIONAL")
      }, 1500)
    }
  }

  // NOTE: This fucking sucks
  // const topics = parentSubCategoriesOfTopics.hasOwnProperty(subCategoryId)
  //   ? parentSubCategoriesOfTopics[subCategoryId].hasOwnProperty("topics")
  //     ? parentSubCategoriesOfTopics[subCategoryId].topics
  //     : []
  //   : []

  // Ahh... This is much better.
  const topics = getNestedProperty(
    parentSubCategoriesOfTopics,
    [subCategoryId, "topics"],
    []
  )

  const keys = getNestedProperty(
    parentSubCategoriesOfTopics,
    [subCategoryId, "topicIds"],
    []
  )

  return (
    <ScrollProvider listId="main-content" fn={handleScroll}>
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
              <div id="resource-list" ref={topicListRef}>
                {loading &&
                loadingResource === LIST_TOPICS &&
                keys.length === 0 ? (
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
                {loading &&
                  loadingResource === LIST_TOPICS &&
                  keys.length > 0 && <h1>Loading...</h1>}
              </div>
            </Timer>
          </div>
        </div>
      </Container>
    </ScrollProvider>
  )
}

export default React.memo(TopicList)
