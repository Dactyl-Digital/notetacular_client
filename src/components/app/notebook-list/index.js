import React, { useState, useEffect } from "react"
import { useNotebook } from "../../../hooks/queries/useNotebook"
import { useNotebookActions } from "../../../hooks/commands/useNotebookActions"
import ResourceListing from "../../shared/resource-listing"

const NotebookList = () => {
  const { notebooks, listNotebooksOffset } = useNotebook()
  const { createNotebook, listNotebooks } = useNotebookActions()
  const [title, setTitle] = useState(false)
  const [showCreateNotebookModal, setShowCreateNotebookModal] = useState(false)

  useEffect(() => {
    // if (listNotebooksOffset === 0) {
    listNotebooks(listNotebooksOffset)
    // }
  }, [])

  const loadMoreNotebooks = () => listNotebooks(listNotebooksOffset)

  // TODO: This is duplicated in note-list.js
  // (toggleShowCreateNoteModal & handleCreateNewNote)
  // Create a hook for this shiz.
  const toggleShowCreateNotebookModal = () =>
    setShowCreateNotebookModal(!showCreateNotebookModal)

  const handleCreateNewNotebook = e => {
    e.preventDefault()
    createNotebook({ title })
    setTitle("")
    setShowCreateNotebookModal(!showCreateNotebookModal)
  }

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
        <h1>Notebooks</h1>
        <div>Search Icon</div>
        {Object.keys(notebooks).map(key => (
          <ResourceListing
            key={notebooks[key].id.toString()}
            title={notebooks[key].title}
          />
        ))}
        <button onClick={toggleShowCreateNotebookModal}>Create Notebook</button>
        {showCreateNotebookModal ? (
          <form onSubmit={handleCreateNewNotebook}>
            <label for="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <button>Submit!</button>
          </form>
        ) : null}
        <button onClick={loadMoreNotebooks}>Load More</button>
      </div>
    </div>
  )
}

export default NotebookList
