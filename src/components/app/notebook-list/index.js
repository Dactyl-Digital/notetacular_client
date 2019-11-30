import React, { useState, useEffect } from "react"
import { useNotebook } from "../../../hooks/queries/useNotebook"
import { useNotebookActions } from "../../../hooks/commands/useNotebookActions"
import Heading from "../../shared/heading"
import ResourceListing from "../../shared/resource-listing"
import Modal from "../../shared/modal"

const NotebookList = () => {
  const { notebooks, listNotebooksOffset } = useNotebook()
  const { createNotebook, listNotebooks } = useNotebookActions()
  const [title, setTitle] = useState(false)

  useEffect(() => {
    // if (listNotebooksOffset === 0) {
    listNotebooks(listNotebooksOffset)
    // }
  }, [])

  const loadMoreNotebooks = () => listNotebooks(listNotebooksOffset)

  const handleCreateNewNotebook = () => {
    createNotebook({ title })
    setTitle("")
  }

  // TODO: Implement navigating to the list of sub categories for a given
  //       notebook onClick.
  //       The redirect URL will contain the notebook id, which can then be
  //       used within the SubCategoryList component to select the Notebook from
  //       the redux state, obtain the sub_category_id_list, and make the API
  //       request to the backend upon initial mount.

  return (
    <div
      style={{
        display: "flex",
        flex: "1",
        justifyContent: "space-between",
        borderBottom: "1px solid #d1c1e0",
      }}
    >
      <div>
        <Heading title="Notebooks" />
        {Object.keys(notebooks).map(key => (
          <ResourceListing
            key={notebooks[key].id.toString()}
            title={notebooks[key].title}
            link={`notebook/${notebooks[key].id}/sub-categories`}
          />
        ))}

        {/* // TODO: Implement scroll loading, and introduce some state // to keep
        track of whether there are more pages to be // retrieved -> by checking
        whether the most recent // page fetch retrieved 20 elements, if less,
        then // there are no more pages to retrieve. */}
        <button onClick={loadMoreNotebooks}>Load More</button>
        <Modal resource="Notebook">
          {toggleShowModal => (
            <form
              onSubmit={e => {
                e.preventDefault()
                handleCreateNewNotebook()
                toggleShowModal(false)
              }}
            >
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <button>Submit!</button>
            </form>
          )}
        </Modal>
      </div>
    </div>
  )
}

export default NotebookList
