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
import NotificationSnacks from "../../shared/notification-snacks"
import Heading from "../../shared/heading"
import Sidebar from "../../shared/sidebar"
import ResourceListing from "../../shared/resource-listing"
// import CreateSubCategoryModal from "./create-sub-category-modal"
import CreateResourceModal from "../../shared/create-resource-modal"
// TODO: You're exporting an exact copy of this from notebook-list
// as the CircleScrollNav needs it to use the Context Provider.
// Need to figure out a better arrangement for this
import { ActiveCircleContext } from "../notebook-list"
import Button from "../../shared/button"
import StyledForm from "../../shared/styled-form"
import {
  onResourceLoadScrollIntoView,
  checkFormSubmissionErrors,
} from "../helpers"

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
  setSnacks,
  showSnacks,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    if (isLoading !== loading) {
      if (createSubCategoryError) {
        setIsLoading(loading)
        return
      } else if (loading === false) {
        toggleShowModal(false)
        setTitle("")
        showSnacks({
          message: "Sub Category successfully created!",
          type: "SUCCESS",
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
          // Works in this case... because there will only ever be one.
          // But how will I handle this for the signup/login form... or the
          // tag creation form.
          checkFormSubmissionErrors(
            createSubCategoryError,
            setSnacks,
            toggleShowModal,
            message => <p className="input-error">{message}</p>
          )}
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
  const [snacks, setSnacks] = useState([])
  const [title, setTitle] = useState("")
  const [activeCircle, setActiveCircle] = useState({
    active: null,
    activePosition: 0,
  })
  const [setActiveDisabled, setSetActiveDisabled] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)
  const listEl = useRef(null)

  useEffect(() => {
    let hash
    if (typeof window !== "undefined") {
      hash = window.location.hash
    }
    if (hash && !activeCircle.active) {
      const id = hash.slice(1, hash.length)
      onResourceLoadScrollIntoView(id)
    }
    listEl.current.addEventListener("scroll", handleScroll)

    if (subCategoryListError) {
      return setSnacks([
        ...snacks,
        { message: subCategoryListError.message, type: "ERROR" },
      ])
    }

    // WTF NOTE:
    // There's a recursive fetch of listing a notebook's sub categories
    // when navigating directly to it via a link which specifies a notebook
    // Probably due to including loading and createSubCategoryError in the list
    // of the useEffect dependencies....
    let subCategoryIdList
    if (notebooks.hasOwnProperty(notebookId)) {
      subCategoryIdList = notebooks[notebookId].sub_categories
    } else {
      // NOTE: The case when the user copies and pastes the link into the browser.
      return listNotebooksSubCategories({ notebookId, limit: 20, offset: 0 })
    }

    if (parentNotebooksOfSubCategories.hasOwnProperty(notebookId)) {
      if (
        !parentNotebooksOfSubCategories[notebookId].subCategoriesPaginationEnd
      ) {
        listSubCategories({
          offset: parentNotebooksOfSubCategories[notebookId].listOffset,
          sub_category_id_list: subCategoryIdList,
        })
      }
    } else {
      if (subCategoryIdList.length > 0) {
        listSubCategories({
          offset: 0,
          sub_category_id_list: subCategoryIdList,
        })
      }
    }

    return () => {
      listEl.current.removeEventListener("scroll", handleScroll)
    }
  }, [activeCircle, loading, createSubCategoryError])

  const handleScroll = () => {
    setScrollTop(listEl.current.scrollTop)
  }

  const handleCreateNewSubCategory = () => {
    if (createSubCategoryError) {
      clearCreateSubCategoryError({ response: { data: null } })
    }
    createSubCategory({ title, notebook_id: notebookId })
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
      setTimeout(() => setSetActiveDisabled(false), 1500)
    }
  }

  const showSnacks = newSnack => {
    setSnacks([...snacks, newSnack])
    setTimeout(() => {
      setSnacks([])
    }, 3000)
  }

  // NOTE: This fucking sucks
  const subCategories = parentNotebooksOfSubCategories.hasOwnProperty(
    notebookId
  )
    ? parentNotebooksOfSubCategories[notebookId].hasOwnProperty("subCategories")
      ? parentNotebooksOfSubCategories[notebookId].subCategories
      : []
    : []

  const keys = Object.keys(subCategories)
  return (
    <ActiveCircleContext.Provider
      value={{
        ...activeCircle,
        setActive,
      }}
    >
      <Container data-testid="sub-category-list-page">
        <Sidebar keys={keys} resourceList={subCategories} />
        <div id="main-content" ref={listEl}>
          <div id="main-content-wrapper">
            <div id="heading-modal-container">
              <NotificationSnacks snacks={snacks} />
              <Heading title="Sub Categories" />
              {/* <CreateSubCategoryModal notebookId={notebookId} /> */}
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
                      setSnacks={setSnacks}
                      showSnacks={showSnacks}
                    />
                  </StyledForm>
                )}
              </CreateResourceModal>
            </div>
            <div id="resource-list">
              {loading && loadingResource === LIST_SUB_CATEGORIES ? (
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
                    active={activeCircle.active === subCategories[key].title}
                    setActiveDisabled={setActiveDisabled}
                    scrollTop={scrollTop}
                    setActiveCircle={setActiveCircle}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </Container>
    </ActiveCircleContext.Provider>
  )
}

export default SubCategoryList
