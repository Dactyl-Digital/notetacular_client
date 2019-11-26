import React from "react"
import ResourceListing from "../../shared/resource-listing"

const NotebookList = () => (
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
      <ResourceListing title="JavaScript" />
      <ResourceListing title="Guitar" />
    </div>
  </div>
)

export default NotebookList
