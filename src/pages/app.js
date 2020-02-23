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
import NotificationProvider from "../components/shared/notification-snacks/notification-provider"
import NotificationSnacks from "../components/shared/notification-snacks"
// const TopicList = React.lazy(() => import("../components/app/topic-list"))

const App = () => {
  if (typeof window !== "undefined") {
    return (
      <Layout>
        <NotificationProvider initialNotifications={{}}>
          <NotificationSnacks />
          <Router>
            <Signup path="/app/signup/" />
            <Login path="/app/login/" />
            <EmailVerification path="/app/api/verify-email/*" />
            {/* <PrivateRoute path="/app/" component={RecentlyUpdatedNotebooks} /> */}
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
        </NotificationProvider>
      </Layout>
    )
  }
  return null
}

export default App
