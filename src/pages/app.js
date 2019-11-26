import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import Signup from "../components/app/signup"
import Login from "../components/app/login"
import PrivateRoute from "../components/shared/private-route"
import RecentlyUpdatedNotebooks from "../components/app/recently-updated-notes"
import NotebookList from "../components/app/notebook-list"
import SubCategoryList from "../components/app/sub-category-list"
import TopicList from "../components/app/topic-list"

const App = () => (
  <Layout>
    <Router>
      <Signup path="/app/signup" />
      <Login path="/app/login" />
      <PrivateRoute path="/app/" component={RecentlyUpdatedNotebooks} />
      {/* TODO: Utilize path params for dynamic linking */}
      <PrivateRoute path="/app/notebooks" component={NotebookList} />
      <PrivateRoute path="/app/sub-categories" component={SubCategoryList} />
      <PrivateRoute path="/app/topics" component={TopicList} />
    </Router>
  </Layout>
)
export default App
