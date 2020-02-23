import React, { useState } from "react"
import styled from "styled-components"
import { useAuth } from "../../../hooks/queries/useAuth"
import { useAuthActions } from "../../../hooks/commands/useAuthActions"
import StyledForm from "../../shared/styled-form"
import Button from "../../shared/button"
import { renderAuthFormError } from "../helpers"

// TODO: Need to style this form better so that the button doesn't overflow out of the
// container when the errors are displayed...
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #11eef6;
  overflow: hidden;

  #success-container {
    display: flex;
    flex-direction: column;
    background: #fcfcfc;
    padding: 1.4rem;
    border-radius: 5px;
    box-shadow: 0rem 0.1rem 1rem rgba(255, 255, 255, 70%);

    h4 {
      color: #969494;
      margin: 0;
      font-size: 1.2rem;
    }

    p {
      color: #444;
      margin: 0;
      margin-top: 0.8rem;
      font-size: 0.9rem;
    }
  }

  #form-container {
    height: auto;
    padding-bottom: 0.8rem;

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
    border-radius: 5px;
    /* box-shadow: 0rem 0.1rem 1rem rgba(17, 238, 246, 30%); */
    box-shadow: 0rem 0.1rem 1rem rgba(255, 255, 255, 70%);
    background: #fcfcfc;
  }
`

const Signup = () => {
  const { signupSuccess, signupError } = useAuth()
  const { signupUser } = useAuthActions()
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  })

  const handleSubmit = signupData => signupUser(signupData)

  const handleChange = e =>
    setSignupData({ ...signupData, [e.target.id]: e.target.value })

  if (signupSuccess) {
    return (
      <Container>
        <div id="success-container">
          <h4>You've successfully signed up!</h4>
          <p>Check your email to activate your account.</p>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <div id="form-container">
        <h1>Signup</h1>
        <StyledForm
          inputMarginBottom={true}
          signupForm={true}
          spanWidth={true}
          onSubmit={e => {
            e.preventDefault()
            handleSubmit(signupData)
          }}
        >
          <div className="form-fields">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={signupData.username}
              onChange={handleChange}
            />
            {signupError &&
              renderAuthFormError({
                field: "username",
                errors: signupError.errors,
              })}
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              value={signupData.email}
              onChange={handleChange}
            />
            {signupError &&
              renderAuthFormError({
                field: "email",
                errors: signupError.errors,
              })}
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={signupData.password}
              onChange={handleChange}
            />
            {signupError &&
              renderAuthFormError({
                field: "password",
                errors: signupError.errors,
              })}
            <Button type="CREATE" formButton={true}>
              Submit
            </Button>
          </div>
        </StyledForm>
      </div>
    </Container>
  )
}

export default Signup
