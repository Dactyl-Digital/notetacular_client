import React, { useEffect } from "react"
import { useNotebook } from "../../../hooks/queries/useNotebook"
import { useNotebookActions } from "../../../hooks/commands/useNotebookActions"
import ResourceListing from "../../shared/resource-listing"

const NotebookList = () => {
  const { notebooks, listNotebooksOffset } = useNotebook()
  const { listNotebooks } = useNotebookActions()

  useEffect(() => {
    if (listNotebooksOffset === 0) {
      listNotebooks(listNotebooksOffset)
    }
  }, [notebooks])

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
          <ResourceListing title={notebooks[key]} />
        ))}
        <ResourceListing title="Guitar" />
      </div>
    </div>
  )
}

export default NotebookList
