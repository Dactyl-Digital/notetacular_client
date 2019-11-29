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
    <button
      onClick={() => {
        localStorage.removeItem("authenticated")
      }}
    >
      Log Out
    </button>
  </div>
)

export default Sidebar
