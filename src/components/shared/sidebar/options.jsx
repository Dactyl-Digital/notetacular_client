import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { useAuthActions } from "../../../hooks/commands/useAuthActions"
import { useAuth } from "../../../hooks/queries/useAuth"
import styled from "styled-components"
import ArrowIcon from "../icons/arrow-icon"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.4rem;

  #options-dropdown-container {
    display: flex;
    &:hover {
      cursor: pointer;
    }
  }

  #arrow-icon {
    display: flex;
    align-items: center;
    margin-right: 0.6rem;
  }

  #more-options {
    font-size: 1.6rem;
    font-family: "Blinker", sans-serif;
    color: #fcfcfc;
    text-shadow: 0.13rem 0.13rem #1b7171;
  }

  ul {
    margin-bottom: 0;
    margin-top: 1rem;
    padding-left: 0.4rem;
    list-style: none;
    font-family: "Blinker", sans-serif;
    font-weight: 600;
    color: #fcfcfc;
    text-shadow: 0.13rem 0.13rem #1b7171;

    li {
      margin-top: -0.2rem;
      &:last-child {
        margin-bottom: 0;
      }

      a {
        margin-bottom: 0;
        color: #fcfcfc;
        text-decoration: none;
      }
    }
  }
`
// TODO: Should Container be a button... or a div to facilitate the dropdown click?
const Options = () => {
  const { authenticated } = useAuth()
  const { logoutUser } = useAuthActions()
  const [showOptions, setShowOptions] = useState(false)

  useEffect(() => {
    if (!authenticated) {
      localStorage.removeItem("authenticated")
    }
  }, [authenticated])

  const toggleShowOptions = () => setShowOptions(!showOptions)

  return (
    <Container>
      <div id="options-dropdown-container" onClick={toggleShowOptions}>
        <div id="arrow-icon">
          <ArrowIcon />
        </div>
        <span id="more-options">More Options</span>
      </div>
      {showOptions && (
        <ul>
          <li>
            <Link to="/app/account">Your Account</Link>
          </li>
          <li>
            <div
              onClick={() => {
                // TODO: Implement useAuthAction -> logoutUser
                // and handle localStorage.removeItem("authenticated") inside
                // of the store.subscribe handleChange function
                if (authenticated) {
                  logoutUser()
                }
              }}
            >
              Log Out
            </div>
          </li>
        </ul>
      )}
    </Container>
  )
}

export default Options
