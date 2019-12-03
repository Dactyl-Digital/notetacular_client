import React, { useRef, useState, useEffect } from "react"
import styled from "styled-components"
import { useNotebook } from "../../../hooks/queries/useNotebook"
import { useNotebookActions } from "../../../hooks/commands/useNotebookActions"
import Heading from "../../shared/heading"
import Sidebar from "../../shared/sidebar"
import ResourceListing from "../../shared/resource-listing"
import CreateNotebookModal from "./create-notebook-modal"

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
    height: 100vh;
    overflow-y: scroll;
  }
`

const NotebookList = () => {
  const { notebooks, listNotebooksOffset } = useNotebook()
  const { listNotebooks } = useNotebookActions()
  const [activeCircle, setActiveCircle] = useState({
    active: null,
    activePosition: 0,
  })
  const [scrollTopHeight, setScrollTopHeight] = useState({
    scrollTop: null,
    scrollHeight: null,
  })
  const [currentElTop, setCurrentElTop] = useState({
    top: null,
    title: null,
  })
  const [elementTopList, setElementTopList] = useState([])
  const listEl = useRef(null)

  useEffect(() => {
    console.log("the element topList")
    console.log(elementTopList)
    listEl.current.addEventListener("scroll", handleScroll)
    if (Object.keys(notebooks).length === 0) {
      listNotebooks(listNotebooksOffset)
    }
    if (scrollTopHeight.scrollHeight === null) {
      setScrollTopHeight({
        scrollTop: listEl.current.scrollTop,
        scrollHeight: listEl.current.scrollHeight,
      })
    }
    console.log("the currentElTop")
    console.log(currentElTop)
    return () => {
      listEl.current.removeEventListener("scroll", handleScroll)
    }
  }, [scrollTopHeight, currentElTop, elementTopList])

  const handleScroll = () => {
    console.log("listEl.current.scrollTop: ", listEl.current.scrollTop)
    console.log("listEl.current.scrollHeight: ", listEl.current.scrollHeight)
    setScrollTopHeight({
      scrollTop: listEl.current.scrollTop,
      scrollHeight: listEl.current.scrollHeight,
    })
  }

  const setActive = ({ active, activePosition }) => {
    console.log("calling setActiveCircle")
    setActiveCircle({ ...activeCircle, active, activePosition })
  }

  const updateElementTopList = elementTop =>
    setElementTopList([...elementTopList, elementTop])

  const loadMoreNotebooks = () => listNotebooks(listNotebooksOffset)

  // TODO: Implement navigating to the list of sub categories for a given
  //       notebook onClick.
  //       The redirect URL will contain the notebook id, which can then be
  //       used within the SubCategoryList component to select the Notebook from
  //       the redux state, obtain the sub_category_id_list, and make the API
  //       request to the backend upon initial mount.

  const keys = Object.keys(notebooks)

  return (
    <Container>
      <ActiveCircleContext.Provider
        value={{
          ...activeCircle,
          setActive,
        }}
      >
        <Sidebar keys={keys} resourceList={notebooks} />
        <div id="main-content" ref={listEl}>
          <Heading title="Notebooks" />
          <CreateNotebookModal />
          <div id="notebook-list">
            {keys.map((key, i) => (
              <ResourceListing
                key={notebooks[key].id.toString()}
                title={notebooks[key].title}
                link={`notebook/${notebooks[key].id}/sub-categories`}
                index={i}
                setActiveCircle={setActiveCircle}
                scrollTopHeight={scrollTopHeight}
                currentElTop={currentElTop}
                setCurrentElTop={setCurrentElTop}
                updateElementTopList={updateElementTopList}
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
      </ActiveCircleContext.Provider>
    </Container>
  )
}

export default NotebookList
