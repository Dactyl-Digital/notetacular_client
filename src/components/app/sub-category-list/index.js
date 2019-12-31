import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { useNotebook } from "../../../hooks/queries/useNotebook"
import { useSubCategory } from "../../../hooks/queries/useSubCategory"
import { useSubCategoryActions } from "../../../hooks/commands/useSubCategoryActions"
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

const SubCategoryList = ({ notebookId }) => {
  const { notebooks } = useNotebook()
  const { parentNotebooksOfSubCategories } = useSubCategory()
  const { createSubCategory, listSubCategories } = useSubCategoryActions()
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
    const subCategoryIdList = notebooks[notebookId].sub_categories
    // TODO: Implement the condition which will check the paginationEnd.
    // if (subCategoryIdList.length > 0) {
    //   listSubCategories({
    //     offset: 0,
    //     sub_category_id_list: subCategoryIdList,
    //   })
    // }

    console.dir(parentNotebooksOfSubCategories)
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
  }, [activeCircle])

  const handleScroll = () => {
    setScrollTop(listEl.current.scrollTop)
  }

  const handleCreateNewSubCategory = () => {
    createSubCategory({ title, notebook_id: notebookId })
    setTitle("")
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
          <Heading title="Sub Categories" />
          {/* <CreateSubCategoryModal notebookId={notebookId} /> */}
          <CreateResourceModal
            action="Create"
            resource="Sub Category"
            buttonType="NORMAL"
          >
            {toggleShowModal => (
              <StyledForm
                onSubmit={e => {
                  e.preventDefault()
                  handleCreateNewSubCategory()
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
          <div id="sub-category-list">
            {keys.map((key, i) => (
              <ResourceListing
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
            ))}
          </div>
        </div>
      </Container>
    </ActiveCircleContext.Provider>
  )
}

export default SubCategoryList
