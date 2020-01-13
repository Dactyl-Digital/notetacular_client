import React, { useState, useEffect } from "react"
import { Link } from "@reach/router"
import axios from "axios"
import { API_URL } from "../../../api-endpoints"

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

export default EmailVerification
