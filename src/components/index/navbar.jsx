import React from "react"
import { Link } from "gatsby"

const Navbar = () => (
  <div
    style={{
      display: "flex",
      flex: "1",
      justifyContent: "space-between",
      borderBottom: "1px solid #d1c1e0",
    }}
  >
    {/* <h4>Notastical</h4> */}
    <nav>
      <Link to="/about">About</Link>
      {` `}
      <Link to="/pricing">Pricing</Link>
      {` `}
      <Link to="/app/login">Login</Link>
      <button>
        <Link to="/app/login">Try it for Free</Link>
      </button>
    </nav>
  </div>
)

export default Navbar
