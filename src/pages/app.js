import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import PrivateRoute from "../components/shared/PrivateRoute"
import RecentlyUpdatedNotebooks from "../components/app/recently-updated-notebooks"
import Signup from "../components/app/signup"
import Login from "../components/app/login"

const App = () => (
  <Layout>
    <Router>
      <Signup path="/app/signup" />
      <Login path="/app/login" />
      <PrivateRoute path="/app/" component={RecentlyUpdatedNotebooks} />
    </Router>
  </Layout>
)
export default App
