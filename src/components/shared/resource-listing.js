import React from "react"

const ResourceListing = ({ title }) => (
  <div
    style={{
      display: "flex",
      flex: "1",
      justifyContent: "space-between",
      borderBottom: "1px solid #d1c1e0",
    }}
  >
    <h3>{title}</h3>
  </div>
)

export default ResourceListing
