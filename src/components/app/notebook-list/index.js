import React, { useState, useEffect, useRef } from "react"
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
            notifiedAt: Date.now(),
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
  const notebookListRef = useRef(null)
  const { loading, loadingResource } = useUi()
  const {
    notebooks,
    notebookIds,
    notebooksPaginationEnd,
    listNotebooksOffset,
    notebookListError,
    createNotebookError,
    deleteNotebookError,
  } = useNotebook()
  const {
    createNotebook,
    listNotebooks,
    clearCreateNotebookError,
  } = useNotebookActions()
  const { addNotification } = useNotifications()
  const [title, setTitle] = useState("")
  const [fetchNotebooks, setFetchNotebooks] = useState(false)

  useEffect(() => {
    loadInitialList({
      type: "NOTEBOOK",
      resource: notebooks,
      listResourceFn: listNotebooks,
      listOffset: listNotebooksOffset,
      paginationEnd: notebooksPaginationEnd,
      loading: loading,
    })

    if (!loading && fetchNotebooks && !notebooksPaginationEnd) {
      listNotebooks(listNotebooksOffset)
    }

    if (notebookListError) {
      return addNotification({
        key: "NOTEBOOK_LIST_ERROR",
        notification: {
          message: notebookListError.message,
          type: "ERROR",
          notifiedAt: Date.now(),
        },
      })
    } else if (deleteNotebookError) {
      return addNotification({
        key: "DELETE_NOTEBOOK_ERROR",
        notification: {
          message: deleteNotebookError.message,
          type: "ERROR",
          notifiedAt: Date.now(),
        },
      })
    }
  }, [
    fetchNotebooks,
    loading,
    notebookListError,
    createNotebookError,
    deleteNotebookError,
  ])

  const handleCreateNewNotebook = () => {
    if (createNotebookError) {
      clearCreateNotebookError({ response: { data: null } })
    }
    createNotebook({ title })
  }

  const handleScroll = e => {
    if (loading && loadingResource === "LIST_NOTEBOOKS") {
      e.preventDefault()
      return
    }
    const { clientHeight } = e.target
    const { bottom } = notebookListRef.current.getBoundingClientRect()

    if (bottom < clientHeight && !loading) {
      // Closure being a bitch again. Because the eventListener
      // is set up in the useEffect hook... And no updates occur.
      // When the trigger occurs to load new notes, this will still be empty.
      // listNotes({
      //   offset: parentTopicsOfNotes[topicId].listOffset,
      //   note_id_list: noteIdList,
      // })
      // SOLUTION: Going to use a useState hook, to trigger loading new notes.
      setFetchNotebooks(true)
      setTimeout(() => {
        setFetchNotebooks(false)
      }, 0)
    }
  }

  // TODO: Implement navigating to the list of sub categories for a given
  //       notebook onClick.
  //       The redirect URL will contain the notebook id, which can then be
  //       used within the SubCategoryList component to select the Notebook from
  //       the redux state, obtain the sub_category_id_list, and make the API
  //       request to the backend upon initial mount.

  // const keys = Object.keys(notebooks)
  const keys = notebookIds

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
    <ScrollProvider listId="main-content" fn={handleScroll}>
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
            <div id="resource-list" ref={notebookListRef}>
              {loading &&
              loadingResource === LIST_NOTEBOOKS &&
              keys.length === 0 ? (
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
              {loading &&
                loadingResource === LIST_NOTEBOOKS &&
                keys.length > 0 && <h1>Loading...</h1>}
            </div>
          </div>
        </div>
      </Container>
    </ScrollProvider>
  )
}

export default NotebookList
