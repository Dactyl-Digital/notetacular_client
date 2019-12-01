import React from "react"
import { Link } from "gatsby"

const ResourceListing = ({ title, link }) => (
  <div
    style={{
      display: "flex",
      flex: "1",
      justifyContent: "space-between",
      borderBottom: "1px solid #d1c1e0",
    }}
  >
    <Link to={`/app/${link}`}>
      <h3>{title}</h3>
    </Link>
  </div>
)

export default ResourceListing
