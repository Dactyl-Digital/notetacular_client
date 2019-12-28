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
  overflow: hidden;

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

  #options-menu-container {
    display: block;
    overflow: hidden;
    margin-top: 0.2rem;
    max-height: 0rem;
    transition: max-height 0.6s ease-in-out;
    /* NOTE: Applying a percentage height doesn't trigger the transition */
    max-height: ${props => props.toggled && `10rem`};
  }

  ul {
    margin-top: 0.6rem;
    margin-bottom: 0;
    padding-left: 0.4rem;
    list-style: none;
    font-family: "Blinker", sans-serif;
    font-weight: 600;
    color: #fcfcfc;
    text-shadow: 0.13rem 0.13rem #1b7171;

    transform: translateY(-100%);
    opacity: 0%;
    transition: opacity 0.6s, transform 0.8s ease-in-out;
    transform: ${props => props.toggled && `translateY(0%)`};
    opacity: ${props => props.toggled && `100%`};

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
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem("authenticated")
      }
    }
  }, [authenticated])

  const toggleShowOptions = () => setShowOptions(!showOptions)

  return (
    <Container toggled={showOptions}>
      <div id="options-dropdown-container" onClick={toggleShowOptions}>
        <div id="arrow-icon">
          <ArrowIcon toggled={showOptions} />
        </div>
        <span id="more-options">More Options</span>
      </div>
      {/* {showOptions && ( */}
      <div id="options-menu-container">
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
      </div>
      {/* )} */}
    </Container>
  )
}

export default React.memo(Options)
