import React, { useState, useEffect } from "react"
import { Router, Link } from "@reach/router"
import axios from "axios"
import { API_URL } from "../api-endpoints"
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

const EmailVerification = props => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const [VERIFICATION_URL, ..._rest] = props.location.href.match(
      /\/verify-email.*/
    )
    axios
      .get(`${API_URL}${VERIFICATION_URL}`)
      .then(({ data }) => {
        setData(data.message)
      })
      .catch(err => {
        setError("Oops... Something went wrong. Please try again.")
      })
  }, [])

  return (
    <>
      <h1>Email Verification Page!</h1>
      <div>
        Status:{" "}
        {data && (
          <>
            <div>data</div>
            <Link to="/app/login">Go Login!</Link>
          </>
        )}{" "}
        {error && error}
      </div>
    </>
  )
}

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
      <EmailVerification path="/app/api/verify-email/*" />
    </Router>
  </Layout>
)

export default App
