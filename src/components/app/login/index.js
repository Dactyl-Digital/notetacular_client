import React, { useState } from "react"
import styled from "styled-components"
import { navigate } from "gatsby"
import { useAuth } from "../../../hooks/queries/useAuth"
import { useAuthActions } from "../../../hooks/commands/useAuthActions"
import StyledForm from "../../shared/styled-form"
import Button from "../../shared/button"
// TODO: Create your necessary equivalents as this is used in the
// /components/shared/privateRoute.js file as well to protect routes.
// import { handleLogin, isLoggedIn } from "../services/auth"

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #11eef6;
  overflow: hidden;

  #form-container {
    h1 {
      padding-top: 1.4rem;
      padding-left: 1.4rem;
      margin-bottom: 0;
      color: #969494;
      font-family: "Blinker", sans-serif;
    }

    p {
      font-size: 0.7rem;
      margin: 0;
      margin-top: -1rem;
    }

    width: 16rem;
    height: 20rem;
    border-radius: 5px;
    /* box-shadow: 0rem 0.1rem 1rem rgba(17, 238, 246, 30%); */
    box-shadow: 0rem 0.1rem 1rem rgba(255, 255, 255, 70%);
    background: #fcfcfc;
  }
`

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
    <Container>
      <div id="form-container">
        <h1>Log in</h1>
        <StyledForm
          spanWidth={true}
          onSubmit={e => {
            e.preventDefault()
            handleLogin(loginData)
          }}
        >
          <div className="form-fields">
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
          </div>
          <Button type="CREATE" formButton={true}>
            Submit
          </Button>
          {/* <input type="submit" value="Log In" /> */}
        </StyledForm>
      </div>
    </Container>
  )
}

export default Login
