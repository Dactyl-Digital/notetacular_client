import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { useUi } from "../../../hooks/queries/useUi"
import { useNotebook } from "../../../hooks/queries/useNotebook"
import { useSubCategory } from "../../../hooks/queries/useSubCategory"
import { useSubCategoryActions } from "../../../hooks/commands/useSubCategoryActions"
import {
  CREATE_SUB_CATEGORY,
  LIST_SUB_CATEGORIES,
} from "../../../store/actions/ui"
import { useNotifications } from "../../shared/notification-snacks/notification-provider"
import ScrollProvider from "../../shared/resource-providers/scroll-provider"
import Heading from "../../shared/heading"
import Sidebar from "../../shared/sidebar"
import ResourceListing from "../../shared/resource-listing"
// import CreateSubCategoryModal from "./create-sub-category-modal"
import CreateResourceModal from "../../shared/create-resource-modal"
import Button from "../../shared/button"
import StyledForm from "../../shared/styled-form"
import { checkFormSubmissionErrors, getNestedProperty } from "../helpers"

// TODO: It's not a huge issue at the moment... so just fix it later when you
// finally create the ListResourceProvider component to generalize that logic as
// best as possible outside of the list components. The issue being the multiple
// fetch that occurs at the bottom of the list.

// TODO: Duplicated in notebook-list, and topic-list
// move to a shared file.
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

const CreateSubCategoryForm = ({
  title,
  setTitle,
  createSubCategoryError,
  toggleShowModal,
  loading,
  addNotification,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  // TODO Pretty much everything in the useEffect is generlizable w/ the
  // stuff in notebook-list useEffect....
  useEffect(() => {
    if (isLoading !== loading) {
      if (createSubCategoryError) {
        setIsLoading(loading)
        return
      } else if (loading === false) {
        toggleShowModal(false)
        setTitle("")
        addNotification({
          key: "CREATE_SUB_CATEGORY_SUCCESS",
          notification: {
            message: "Sub Category successfully created!",
            type: "SUCCESS",
            notifiedAt: Date.now(),
          },
        })
        setIsLoading(loading)
        return
      }
    }
    setIsLoading(loading)
  }, [isLoading, loading, createSubCategoryError])

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    // TODO: Don't display this if create SubCategory was success.
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
        {createSubCategoryError &&
          title.length < 4 &&
          // TODO: Works in this case... because there will only ever be one.
          // But how will I handle this for the signup/login form... or the
          // tag creation form.
          checkFormSubmissionErrors({
            error: createSubCategoryError,
            notificationKey: "CREATE_SUB_CATEGORY_ERROR",
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

// TODO:
// When navigating to this page before listNotebooks has been called
// and there are no notebooks present with a subCategoryIdList in the redux store...
// Then you'll want to retrieve the list of subCategories with the foreign key reference
// to that notebookId.
const SubCategoryList = ({ notebookId }) => {
  const subCategoryListRef = useRef(null)
  const { loading, loadingResource } = useUi()
  const { notebooks } = useNotebook()
  const {
    parentNotebooksOfSubCategories,
    subCategoryListError,
    createSubCategoryError,
  } = useSubCategory()
  const {
    createSubCategory,
    listSubCategories,
    listNotebooksSubCategories,
    clearCreateSubCategoryError,
  } = useSubCategoryActions()
  const { addNotification } = useNotifications()
  const [title, setTitle] = useState("")
  const [fetchSubCategories, setFetchSubCategories] = useState(false)
  // const [initialListFetched, setInitialListFetched] = useState(false)

  const [listFetchState, setListFetchState] = useState("FETCH_INITIAL_LIST")

  const permittedTransitions = () => {
    const permitted = {
      FETCH_INITIAL_LIST: ["AWAITING_LIST_ADDITIONAL"],
      AWAITING_LIST_ADDITIONAL: ["LIST_ADDITIONAL"],
      LIST_ADDITIONAL: ["AWAITING_LIST_ADDITIONAL"],
    }

    return (state, transition) => {
      if (permitted[state].indexOf(transition) !== -1) {
        setListFetchState(transition)
      }
    }
  }

  const checkPermittedTransition = permittedTransitions()

  const transitionListFetchState = transitionState =>
    checkPermittedTransition(listFetchState, transitionState)

  useEffect(() => {
    if (subCategoryListError) {
      return addNotification({
        key: "SUB_CATEGORY_LIST_ERROR",
        notification: {
          message: subCategoryListError.message,
          type: "ERROR",
          notifiedAt: Date.now(),
        },
      })
    } else if (createSubCategoryError) {
      return addNotification({
        key: "CREATE_SUB_CATEGORY_ERROR",
        notification: {
          message: createSubCategoryError.message,
          type: "ERROR",
          notifiedAt: Date.now(),
        },
      })
    }

    const subCategoryIdList = getNestedProperty(
      notebooks,
      [notebookId, "sub_categories"],
      "DIRECT_URL_NAVIGATION"
    )

    if (!loading && subCategoryIdList === "DIRECT_URL_NAVIGATION") {
      listNotebooksSubCategories({ notebookId, limit: 20, offset: 0 })
      transitionListFetchState("AWAITING_LIST_ADDITIONAL")
      return
    }

    if (!loading && listFetchState === "FETCH_INITIAL_LIST") {
      listSubCategories({
        notebookId,
        offset: 0,
        sub_category_id_list: subCategoryIdList,
      })
      transitionListFetchState("AWAITING_LIST_ADDITIONAL")
      return
    }

    if (
      !loading &&
      parentNotebooksOfSubCategories.hasOwnProperty(notebookId) &&
      subCategoryIdList.length > 0 &&
      listFetchState === "LIST_ADDITIONAL"
    ) {
      listSubCategories({
        notebookId,
        offset: parentNotebooksOfSubCategories[notebookId].listOffset,
        sub_category_id_list: subCategoryIdList,
      })
    }
  }, [listFetchState, loading, subCategoryListError, createSubCategoryError])

  const handleCreateNewSubCategory = () => {
    if (createSubCategoryError) {
      clearCreateSubCategoryError({ response: { data: null } })
    }
    createSubCategory({ title, notebook_id: notebookId })
  }

  const handleScroll = e => {
    if (loading && loadingResource === "LIST_SUB_CATEGORIES") {
      e.preventDefault()
      return
    }
    const { clientHeight } = e.target
    const { bottom } = subCategoryListRef.current.getBoundingClientRect()

    if (bottom < clientHeight && !loading) {
      // Closure being a bitch again. Because the eventListener
      // is set up in the useEffect hook... And no updates occur.
      // When the trigger occurs to load new notes, this will still be empty.
      // listNotes({
      //   offset: parentTopicsOfNotes[topicId].listOffset,
      //   note_id_list: noteIdList,
      // })
      // SOLUTION: Going to use a useState hook, to trigger loading new notes.

      // setFetchSubCategories(true)
      // setTimeout(() => {
      //   setFetchSubCategories(false)
      // }, 0)

      setListFetchState("LIST_ADDITIONAL")
      setTimeout(() => {
        setListFetchState("AWAITING_LIST_ADDITIONAL")
      }, 1500)
    }
  }

  // NOTE: This fucking sucks
  // const subCategories = parentNotebooksOfSubCategories.hasOwnProperty(
  //   notebookId
  // )
  //   ? parentNotebooksOfSubCategories[notebookId].hasOwnProperty("subCategories")
  //     ? parentNotebooksOfSubCategories[notebookId].subCategories
  //     : []
  //   : []

  // Ahh... This is much better.
  const subCategories = getNestedProperty(
    parentNotebooksOfSubCategories,
    [notebookId, "subCategories"],
    []
  )

  // const keys = Object.keys(subCategories)
  const keys = getNestedProperty(
    parentNotebooksOfSubCategories,
    [notebookId, "subCategoryIds"],
    []
  )

  return (
    <ScrollProvider listId="main-content" fn={handleScroll}>
      <Container data-testid="sub-category-list-page">
        <Sidebar keys={keys} resourceList={subCategories} />
        <div id="main-content">
          <div id="main-content-wrapper">
            <div id="heading-modal-container">
              <Heading title="Sub Categories" />
              <CreateResourceModal
                action="Create"
                resource="Sub Category"
                buttonType="NORMAL"
                handleOnClose={
                  createSubCategoryError &&
                  (() =>
                    clearCreateSubCategoryError({ response: { data: null } }))
                }
              >
                {toggleShowModal => (
                  <StyledForm
                    onSubmit={e => {
                      e.preventDefault()
                      handleCreateNewSubCategory()
                    }}
                  >
                    <CreateSubCategoryForm
                      title={title}
                      setTitle={setTitle}
                      createSubCategoryError={createSubCategoryError}
                      toggleShowModal={toggleShowModal}
                      loading={
                        loadingResource === CREATE_SUB_CATEGORY
                          ? loading
                          : false
                      }
                      addNotification={addNotification}
                    />
                  </StyledForm>
                )}
              </CreateResourceModal>
            </div>
            <div id="resource-list" ref={subCategoryListRef}>
              {loading &&
              loadingResource === LIST_SUB_CATEGORIES &&
              keys.length === 0 ? (
                <h1>Loading...</h1>
              ) : (
                keys.map((key, i) => (
                  <ResourceListing
                    id={subCategories[key].title}
                    type="SUB_CATEGORY"
                    key={subCategories[key].id.toString()}
                    title={subCategories[key].title}
                    link={`notebook/${notebookId}/sub-category/${subCategories[key].id}/topics`}
                    notebookId={notebookId}
                    subCategoryId={subCategories[key].id}
                    index={i}
                  />
                ))
              )}
              {loading &&
                loadingResource === LIST_SUB_CATEGORIES &&
                keys.length > 0 && <h1>Loading...</h1>}
            </div>
          </div>
        </div>
      </Container>
    </ScrollProvider>
  )
}

export default SubCategoryList
