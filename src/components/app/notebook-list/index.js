import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useUi } from "../../../hooks/queries/useUi"
import { useNotebook } from "../../../hooks/queries/useNotebook"
import { useNotebookActions } from "../../../hooks/commands/useNotebookActions"
import { CREATE_NOTEBOOK, LIST_NOTEBOOKS } from "../../../store/actions/ui"
import Heading from "../../shared/heading"
import Sidebar from "../../shared/sidebar"
import ResourceListing from "../../shared/resource-listing"
// import CreateNotebookModal from "./create-notebook-modal"
import CreateResourceModal from "../../shared/create-resource-modal"
import { useNotifications } from "../../shared/notification-snacks/notification-provider"
import ScrollProvider from "../../shared/resource-providers/scroll-provider"
import Button from "../../shared/button"
import StyledForm from "../../shared/styled-form"
import { checkFormSubmissionErrors } from "../helpers"

const loadInitialList = ({
  type,
  resource,
  listResourceFn,
  listOffset,
  params,
  paginationEnd,
  loading,
}) => {
  if (Object.keys(resource).length === 0 && !loading && !paginationEnd) {
    if (type === "NOTEBOOK") return listResourceFn(listOffset)
    if (type === "SUB_CATEGORY") {
      return listResourceFn({
        offset: listOffset,
        ...params,
      })
    }
  }
}

const Container = styled.div`
  display: flex;

  #main-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 8vw;
    padding-top: 2rem;
    width: 110%;
    height: 100vh;
    overflow: auto;
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

const CreateNotebookForm = ({
  title,
  setTitle,
  createNotebookError,
  toggleShowModal,
  loading,
  addNotification,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  // TODO Pretty much everything in the useEffect is generlizable w/ the
  // stuff in sub-cat-list useEffect....
  useEffect(() => {
    if (isLoading !== loading) {
      if (createNotebookError) {
        setIsLoading(loading)
        return
      } else if (loading === false) {
        toggleShowModal(false)
        setTitle("")
        addNotification({
          key: "CREATE_NOTEBOOK_SUCCESS",
          notification: {
            message: "Notebook successfully created!",
            type: "SUCCESS",
          },
        })
        setIsLoading(loading)
        return
      }
    }
    setIsLoading(loading)
  }, [isLoading, loading, createNotebookError])

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    // TODO: Don't display this if create notebook was success.
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
        {createNotebookError &&
          title.length < 4 &&
          // TODO: Works in this case... because there will only ever be one.
          // But how will I handle this for the signup/login form... or the
          // tag creation form.
          checkFormSubmissionErrors({
            error: createNotebookError,
            notificationKey: "CREATE_NOTEBOOK_ERROR",
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

const NotebookList = () => {
  const { loading, loadingResource } = useUi()
  const {
    notebooks,
    notebooksPaginationEnd,
    listNotebooksOffset,
    notebookListError,
    createNotebookError,
  } = useNotebook()
  const {
    createNotebook,
    listNotebooks,
    clearCreateNotebookError,
  } = useNotebookActions()
  const { addNotification } = useNotifications()
  const [title, setTitle] = useState("")

  useEffect(() => {
    // loadInitialNotebookList()
    loadInitialList({
      type: "NOTEBOOK",
      resource: notebooks,
      listResourceFn: listNotebooks,
      listOffset: listNotebooksOffset,
      paginationEnd: notebooksPaginationEnd,
      loading: loading,
    })

    if (notebookListError) {
      return addNotification({
        key: "NOTEBOOK_LIST_ERROR",
        notification: { message: notebookListError.message, type: "ERROR" },
      })
    }
  }, [loading, notebookListError, createNotebookError])

  // made a generalize helper function, which hopefully can be used across all list components
  // const loadInitialNotebookList = () => {
  //   if (
  //     Object.keys(notebooks).length === 0 &&
  //     !loading &&
  //     !notebooksPaginationEnd
  //   ) {
  //     listNotebooks(listNotebooksOffset)
  //   }
  // }

  const handleCreateNewNotebook = () => {
    if (createNotebookError) {
      clearCreateNotebookError({ response: { data: null } })
    }
    createNotebook({ title })
  }

  const loadMoreNotebooks = () => listNotebooks(listNotebooksOffset)

  // TODO: Implement navigating to the list of sub categories for a given
  //       notebook onClick.
  //       The redirect URL will contain the notebook id, which can then be
  //       used within the SubCategoryList component to select the Notebook from
  //       the redux state, obtain the sub_category_id_list, and make the API
  //       request to the backend upon initial mount.

  const keys = Object.keys(notebooks)

  // NOTE:
  // handleScroll for notebookList.js requires a scrollTop: Int, and setScrollTop: Fn
  // handleScroll for noteList.js doesn't require either scrollTop or setScrollTop...
  // Although, noteLists handleScroll exposes functionality which will be needed by all
  // of the lists to facilitate auto-loading more of the list at the bottom of scroll.
  // But the SubCat and Topic lists surely will. So perhaps make scrollTop and setScrollTop
  // optional functionality which can be passed in/opted into.
  // scrollTop is passed to ResourceListing as a prop.

  // <ScrollProvider> <- Responsible for scrollTop/setScrollTop
  //  <ActiveItemProvider> <- Simply for maintaining the active item (in sidebar and resource list) which should be styled
  //    <ListProvider> <- Responsible for fetching lists. Can hook into ScrollProvider's handleScroll function, to pass in additional
  //                      desired functionality which should execute on scroll (this is where the scroll loading at bottom will occur).
  //     // Rest of the children/html/components in NotebookList
  //    </ListProvider>
  //  </ActiveItemProvider>
  // </ScrollProvider>
  return (
    <ScrollProvider listId="main-content">
      <Container data-testid="notebook-list-page">
        <Sidebar keys={keys} resourceList={notebooks} />
        <div id="main-content">
          <div id="main-content-wrapper">
            <div id="heading-modal-container">
              <Heading title="Notebooks" />
              <CreateResourceModal
                action="Create"
                resource="Notebook"
                buttonType="NORMAL"
                handleOnClose={
                  createNotebookError &&
                  (() => clearCreateNotebookError({ response: { data: null } }))
                }
              >
                {toggleShowModal => (
                  <StyledForm
                    onSubmit={e => {
                      e.preventDefault()
                      handleCreateNewNotebook()
                    }}
                  >
                    {/* // TODO: Don't display this if create notebook was success. */}
                    {/* // Just show the success/error snackbar as a pop up from the top */}
                    <CreateNotebookForm
                      title={title}
                      setTitle={setTitle}
                      createNotebookError={createNotebookError}
                      toggleShowModal={toggleShowModal}
                      loading={
                        loadingResource === CREATE_NOTEBOOK ? loading : false
                      }
                      addNotification={addNotification}
                    />
                  </StyledForm>
                )}
              </CreateResourceModal>
            </div>
            <div id="resource-list">
              {loading && loadingResource === LIST_NOTEBOOKS ? (
                <h1>Loading...</h1>
              ) : (
                keys.map((key, i) => (
                  <ResourceListing
                    id={notebooks[key].title}
                    type="NOTEBOOK"
                    key={notebooks[key].id.toString()}
                    title={notebooks[key].title}
                    link={`notebook/${notebooks[key].id}/sub-categories`}
                    index={i}
                    notebookId={notebooks[key].id}
                  />
                ))
              )}
            </div>
            {/* // TODO: Implement scroll loading, and introduce some state // to keep
          track of whether there are more pages to be // retrieved -> by checking
          whether the most recent // page fetch retrieved 20 elements, if less,
          then // there are no more pages to retrieve. */}
            <button onClick={loadMoreNotebooks}>Load More</button>
          </div>
        </div>
      </Container>
    </ScrollProvider>
  )
}

export default NotebookList
