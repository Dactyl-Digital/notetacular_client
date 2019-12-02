import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useNotebook } from "../../../hooks/queries/useNotebook"
import { useNotebookActions } from "../../../hooks/commands/useNotebookActions"
import Heading from "../../shared/heading"
import Sidebar from "../../shared/sidebar"
import ResourceListing from "../../shared/resource-listing"
import CreateNotebookModal from "./create-notebook-modal"

const Container = styled.div`
  display: flex;

  #main-content {
    /* TODO: For now this at least looks good on large screens... */
    padding: 0 8vw;
    padding-top: 2rem;
    width: 100%;
  }

  #notebook-list {
    margin-top: 2rem;
  }
`

const NotebookList = () => {
  const { notebooks, listNotebooksOffset } = useNotebook()
  const { listNotebooks } = useNotebookActions()

  useEffect(() => {
    // if (listNotebooksOffset === 0) {
    listNotebooks(listNotebooksOffset)
    // }
  }, [])

  const loadMoreNotebooks = () => listNotebooks(listNotebooksOffset)

  // TODO: Implement navigating to the list of sub categories for a given
  //       notebook onClick.
  //       The redirect URL will contain the notebook id, which can then be
  //       used within the SubCategoryList component to select the Notebook from
  //       the redux state, obtain the sub_category_id_list, and make the API
  //       request to the backend upon initial mount.

  return (
    <Container>
      <Sidebar />
      <div id="main-content">
        <Heading title="Notebooks" />
        <CreateNotebookModal />
        <div id="notebook-list">
          {Object.keys(notebooks).map(key => (
            <ResourceListing
              key={notebooks[key].id.toString()}
              title={notebooks[key].title}
              link={`notebook/${notebooks[key].id}/sub-categories`}
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
  )
}

export default NotebookList
