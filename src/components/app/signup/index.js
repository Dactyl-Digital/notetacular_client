import React, { useState } from "react"
import axios from "axios"
import { useAuthActions } from "../../../hooks/commands/useAuthActions"

// axios.defaults.withCredentials = true
// axios.defaults.headers["Accept"] = "application/json"
// axios.defaults.headers["Content-Type"] = "application/json"

// const myApi = axios.create({
//   baseURL: "http://localhost:4000",
//   timeout: 10000,
//   withCredentials: true,
//   transformRequest: [data => JSON.stringify(data.data)],
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
// })

const Signup = () => {
  const { signupUser } = useAuthActions()
  const [signupData, setSignupData] = useState({
    username: "testuser10",
    email: "testuser10@gmail.com",
    password: "testpassword",
  })

  const handleSubmit = e => {
    e.preventDefault()
    signupUser(signupData)
  }

  const handleChange = e =>
    setSignupData({ ...signupData, [e.target.id]: e.target.value })

  return (
    <>
      <h1>Your Signup</h1>
      <form onSubmit={handleSubmit}>
        <label for="username">Username</label>
        <input
          id="username"
          type="text"
          value={signupData.username}
          onChange={handleChange}
        />
        <label for="email">Email</label>
        <input
          id="email"
          type="text"
          value={signupData.email}
          onChange={handleChange}
        />
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          value={signupData.password}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </>
  )
}

export default Signup
