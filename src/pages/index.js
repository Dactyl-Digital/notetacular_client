import React, { useEffect } from "react"
import { Link } from "gatsby"
import axios from "axios"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import Navbar from "../components/index/navbar"

// TODO: Add a isLoggedIn check on this page
// to determine if redirection to /app/ is necessary

const IndexPage = () => {
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const apiResult = await axios.get(
  //         "https://api.notastical.com/test/test"
  //       )
  //       // const adminResult = await axios.get("http://localhost:4000/admin/test")
  //       console.log(`noteactular_client received from api:`)
  //       console.dir(apiResult)
  //     } catch (err) {
  //       console.log(`Error while hitting the backend: ${err}`)
  //       console.dir(err)
  //     }
  //     // requests to admin endpoint on backend blocked by CORS policy.
  //     // Very nice
  //     // console.log(`noteactular_client received from admin:`)
  //     // console.dir(adminResult)
  //   }
  //   fetchData()
  // }, [])

  return (
    <Layout>
      <SEO title="Home" />
      <Navbar></Navbar>
    </Layout>
  )
}

export default IndexPage
