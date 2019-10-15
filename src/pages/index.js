import React, { useEffect } from "react"
import { Link } from "gatsby"
import axios from "axios"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => {
  useEffect(() => {
    async function fetchData() {
      // const apiResult = await axios.get("http://localhost:4000/api/test")
      const adminResult = await axios.get("http://localhost:4000/admin/test")
      // console.log(`noteactular_client received from api:`)
      // console.dir(apiResult)
      // requests to admin endpoint on backend blocked by CORS policy.
      // Very nice
      console.log(`noteactular_client received from admin:`)
      console.dir(adminResult)
    }
    fetchData()
  }, [])

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export default IndexPage
