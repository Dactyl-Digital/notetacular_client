import React, { useRef, useState, useEffect } from "react"
import styled from "styled-components"
import { useUi } from "../../../hooks/queries/useUi"
import { useNotebook } from "../../../hooks/queries/useNotebook"
import { useNotebookActions } from "../../../hooks/commands/useNotebookActions"
import { CREATE_NOTEBOOK, LIST_NOTEBOOKS } from "../../../store/actions/ui"
import NotificationSnacks from "../../shared/notification-snacks"
import Heading from "../../shared/heading"
import Sidebar from "../../shared/sidebar"
import ResourceListing from "../../shared/resource-listing"
// import CreateNotebookModal from "./create-notebook-modal"
import CreateResourceModal from "../../shared/create-resource-modal"
import Button from "../../shared/button"
import StyledForm from "../../shared/styled-form"
import { onResourceLoadScrollIntoView } from "../helpers"

export const ActiveCircleContext = React.createContext({
  active: null,
  activePosition: 0,
  setActive: () => {},
})

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

const CreateNotebookForm = ({
  title,
  setTitle,
  createNotebookError,
  toggleShowModal,
  loading,
  showSnacks,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    if (isLoading !== loading) {
      if (createNotebookError) {
        setIsLoading(loading)
        return
      } else if (loading === false) {
        toggleShowModal(false)
        setTitle("")
        showSnacks({
          message: "Notebook successfully created!",
          type: "SUCCESS",
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
        {createNotebookError && title.length < 4 && (
          // Works in this case... because there will only ever be one.
          // But how will I handle this for the signup/login form... or the
          // tag creation form.
          <p>{createNotebookError.errors[0].message}</p>
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

const NotebookList = () => {
  const { loading, loadingResource } = useUi()
  const {
    notebooks,
    notebooksPaginationEnd,
    listNotebooksOffset,
    createNotebookError,
  } = useNotebook()
  const {
    createNotebook,
    listNotebooks,
    clearCreateNotebookError,
  } = useNotebookActions()
  const [snacks, setSnacks] = useState([])

  const [title, setTitle] = useState("")
  // Create custom hook for all of these... would that really help anything
  // over just copy pasting into sub-category-list & topic-list?
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
    // TODO: Implement logic in handleScroll to check if notebooksPaginationEnd is false (when the
    // user is at the bottom of the page),
    // if so then make another listNotebooks request.
    // IMMEDIATE TODO: Need to keep track of the count of the total
    // number of results received.
    if (!notebooksPaginationEnd) {
      listNotebooks(listNotebooksOffset)
    }
    return () => {
      listEl.current.removeEventListener("scroll", handleScroll)
    }
  }, [activeCircle, loading, createNotebookError])

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

  const showSnacks = newSnack => {
    setSnacks([...snacks, newSnack])
    setTimeout(() => {
      setSnacks([])
    }, 3000)
  }

  return (
    <ActiveCircleContext.Provider
      value={{
        ...activeCircle,
        setActive,
      }}
    >
      <Container data-testid="notebook-list-page">
        <NotificationSnacks snacks={snacks} />
        <Sidebar keys={keys} resourceList={notebooks} />
        <div id="main-content" ref={listEl}>
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
                      showSnacks={showSnacks}
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
                    active={activeCircle.active === notebooks[key].title}
                    setActiveDisabled={setActiveDisabled}
                    scrollTop={scrollTop}
                    setActiveCircle={setActiveCircle}
                  />
                ))
              )}
            </div>
            {/* // TODO: Implement scroll loading, and introduce some state // to keep
          track of whether there are more pages to be // retrieved -> by checking
          whether the most recent // page fetch retrieved 20 elements, if less,
          then // there are no more pages to retrieve. */}
            <button onClick={loadMoreNotebooks}>Load More</button>
            {/* TODO: Create a CreateNotebookModal component */}
          </div>
        </div>
      </Container>
    </ActiveCircleContext.Provider>
  )
}

export default NotebookList
