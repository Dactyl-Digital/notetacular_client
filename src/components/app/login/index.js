import React, { useState } from "react"
import { navigate } from "gatsby"
import { useAuth } from "../../../hooks/queries/useAuth"
import { useAuthActions } from "../../../hooks/commands/useAuthActions"
// TODO: Create your necessary equivalents as this is used in the
// /components/shared/privateRoute.js file as well to protect routes.
// import { handleLogin, isLoggedIn } from "../services/auth"

const Login = () => {
  const { authenticated } = useAuth()
  const { loginUser } = useAuthActions()
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  })

  if (authenticated) {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("authenticated", authenticated)
    }
    navigate("/app/notebooks")
  }

  const handleChange = e => {
    setLoginData({
      ...loginData,
      [e.target.id]: e.target.value,
    })
  }

  const handleLogin = loginData => loginUser(loginData)

  return (
    <>
      <h1>Log in</h1>
      <form
        onSubmit={e => {
          e.preventDefault()
          handleLogin(loginData)
        }}
      >
        <label>
          Username
          <input
            id="username"
            type="text"
            name="username"
            onChange={handleChange}
          />
        </label>
        <label>
          Password
          <input
            id="password"
            type="password"
            name="password"
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Log In" />
      </form>
    </>
  )
}

export default Login
