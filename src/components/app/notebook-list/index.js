import React, { useRef, useState, useEffect } from "react"
import styled from "styled-components"
import { useNotebook } from "../../../hooks/queries/useNotebook"
import { useNotebookActions } from "../../../hooks/commands/useNotebookActions"
import Heading from "../../shared/heading"
import Sidebar from "../../shared/sidebar"
import ResourceListing from "../../shared/resource-listing"
// import CreateNotebookModal from "./create-notebook-modal"
import CreateResourceModal from "../../shared/create-resource-modal"
import Button from "../../shared/button"
import StyledForm from "../../shared/styled-form"

export const ActiveCircleContext = React.createContext({
  active: null,
  activePosition: 0,
  setActive: () => {},
})

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
  }
`

const NotebookList = () => {
  const {
    notebooks,
    notebooksPaginationEnd,
    listNotebooksOffset,
  } = useNotebook()
  const { createNotebook, listNotebooks } = useNotebookActions()
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
      setTimeout(() => {
        let targetResource = document.getElementById(id)
        // NOTE: scrollIntoView worked.... AND I'm willing to settle with that for now!
        // TODO: CLean this shiz up, uninstall gsap, and add hover style to focused element
        // manage that state -> i.e. it should become the active div, until user scrolls
        // then other divs will be newly selected active divs.
        targetResource.scrollIntoView()
        // NOTE: Why did I have this at 5000 before?
      }, 1000)
    }
    listEl.current.addEventListener("scroll", handleScroll)
    // TODO: Implement logic in handleScroll to check if notebooksPaginationEnd is false (when the
    // user is at the bottom of the page),
    // if so then make another listNotebooks request.
    if (!notebooksPaginationEnd) {
      listNotebooks(listNotebooksOffset)
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

  const handleCreateNewNotebook = () => {
    createNotebook({ title })
    setTitle("")
  }

  const loadMoreNotebooks = () => listNotebooks(listNotebooksOffset)

  // TODO: Implement navigating to the list of sub categories for a given
  //       notebook onClick.
  //       The redirect URL will contain the notebook id, which can then be
  //       used within the SubCategoryList component to select the Notebook from
  //       the redux state, obtain the sub_category_id_list, and make the API
  //       request to the backend upon initial mount.

  const keys = Object.keys(notebooks)

  return (
    <ActiveCircleContext.Provider
      value={{
        ...activeCircle,
        setActive,
      }}
    >
      <Container data-testid="notebook-list-page">
        <Sidebar keys={keys} resourceList={notebooks} />
        <div id="main-content" ref={listEl}>
          <Heading title="Notebooks" />
          {/* <CreateNotebookModal /> */}
          <CreateResourceModal
            action="Create"
            resource="Notebook"
            buttonType="NORMAL"
          >
            {/* TODO: Create a separate component for this form. */}
            {toggleShowModal => (
              <StyledForm
                onSubmit={e => {
                  e.preventDefault()
                  handleCreateNewNotebook()
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
          <div id="notebook-list">
            {keys.map((key, i) => (
              <ResourceListing
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
            ))}
          </div>
          {/* // TODO: Implement scroll loading, and introduce some state // to keep
        track of whether there are more pages to be // retrieved -> by checking
        whether the most recent // page fetch retrieved 20 elements, if less,
        then // there are no more pages to retrieve. */}
          <button onClick={loadMoreNotebooks}>Load More</button>
          {/* TODO: Create a CreateNotebookModal component */}
        </div>
      </Container>
    </ActiveCircleContext.Provider>
  )
}

export default NotebookList
