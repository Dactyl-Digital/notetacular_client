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
    /* height: 100%; */
    overflow: hidden;
    margin-top: 0.2rem;
    /* border: 2px solid #222; */

    /* A post recommending transitioning max-height */
    height: 0%;
    background: lime;
    transition: height 0.15s ease-in-out;
    /* animation: open 0.8s; */
    /* animation-duration: 0.8s; */
    /* animation-name: open-options; */
    /* opacity: 0%; */
    height: ${props => props.toggled && `100%`};
    /* animation: ${props =>
      props.toggled
        ? `open-options 1.8s forwards`
        : `close-options 1.8s forwards`}; */
    /* animation: ${props => !props.toggled && `close 0.8s`}; */
    /* transition: height 0.6s; */
    /* height: ${props => props.toggled && `100%`}; */
    /* @keyframes open-options {
      from {
        opacity: 0%;
        height: 0%;
      }
      to {
        opacity: 100%;
        height: 100%;
      }
    }

    @keyframes close-options {
      from {
        opacity: 100%;
        height: 100%;
      }
      to {
        opacity: 0%;
        height: 0%;
      }
    } */
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
      localStorage.removeItem("authenticated")
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

export default Options
