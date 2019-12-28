import React, { useState, useEffect } from "react"
import { Router, Link } from "@reach/router"
import axios from "axios"
import { API_URL } from "../api-endpoints"
import Layout from "../components/layout"
import Signup from "../components/app/signup"
import Login from "../components/app/login"
import EmailVerification from "../components/app/email-verification"
import PrivateRoute from "../components/shared/private-route"
import RecentlyUpdatedNotebooks from "../components/app/recently-updated-notes"
import NotebookList from "../components/app/notebook-list"
import SubCategoryList from "../components/app/sub-category-list"
import TopicList from "../components/app/topic-list"
// const TopicList = React.lazy(() => import("../components/app/topic-list"))

const TestComp = () => {
  return (
    <>
      <h1>If this shows then something is fucked...</h1>
    </>
  )
}

const App = () => {
  if (typeof window !== "undefined") {
    return (
      <Layout>
        <Router>
          <Signup path="/app/signup/" />
          <Login path="/app/login/" />
          <TestComp path="/app/test/" />
          <EmailVerification path="/app/api/verify-email/*" />
          {/* <PrivateRoute path="/app/" component={RecentlyUpdatedNotebooks} /> */}
          {/* TODO: Utilize path params for dynamic linking */}
          <PrivateRoute path="/app/notebooks/" component={NotebookList} />
          <PrivateRoute
            path="/app/notebook/:notebookId/sub-categories/"
            component={SubCategoryList}
          />
          <PrivateRoute
            path="/app/notebook/:notebookId/sub-category/:subCategoryId/topics/"
            component={TopicList}
          />
        </Router>
      </Layout>
    )
  }
  return null
}

export default App
