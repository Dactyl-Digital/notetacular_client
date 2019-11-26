import React from "react"
import { Link } from "gatsby"

const Sidebar = () => (
  <div
    style={{
      display: "flex",
      flex: "1",
      justifyContent: "space-between",
      borderBottom: "1px solid #d1c1e0",
    }}
  >
    <h4>Notastical</h4>
    <div>More Options</div>
    <CircleScrollNav />
  </div>
)

export default Sidebar
