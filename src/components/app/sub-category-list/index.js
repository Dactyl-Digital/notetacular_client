import React from "react"
import ResourceListing from "../../shared/resource-listing"

const SubCategoryList = () => (
  <div
    style={{
      display: "flex",
      flex: "1",
      justifyContent: "space-between",
      borderBottom: "1px solid #d1c1e0",
    }}
  >
    <div>
      <h1>SubCategories</h1>
      <div>Search Icon</div>
    </div>
    <ResourceListing title="Higher-Order Functions" />
    <ResourceListing title="CAGED" />
  </div>
)

export default SubCategoryList
