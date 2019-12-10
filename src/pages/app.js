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

import { useNotebook } from "../hooks/queries/useNotebook"
import { useSubCategory } from "../hooks/queries/useSubCategory"
import { useTopic } from "../hooks/queries/useTopic"

const App = () => (
  <Layout>
    <Router>
      <Signup path="/app/signup" />
      <Login path="/app/login" />
      <PrivateRoute path="/app/" component={RecentlyUpdatedNotebooks} />
      {/* TODO: Utilize path params for dynamic linking */}
      <PrivateRoute path="/app/notebooks" component={NotebookList} />
      <PrivateRoute
        path="/app/notebook/:notebookId/sub-categories"
        component={SubCategoryList}
      />
      <PrivateRoute
        path="/app/notebook/:notebookId/sub-category/:subCategoryId/topics"
        component={TopicList}
      />
    </Router>
  </Layout>
)

export default App
