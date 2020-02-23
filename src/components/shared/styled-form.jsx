import React from "react"
import styled from "styled-components"

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 14rem;
  /* Soo much style hack. Need better organization/pre-planning for this stuff. (Button would overflow */
  /* this container otherwise) */
  height: ${props => props.signupForm && "100%"};
  min-height: 14rem;
  max-height: ${props => (props.signupForm ? "22rem" : "18rem")};
  padding: ${props => (props.noPadding ? "0rem" : "1.4rem")};
  padding-bottom: 0;

  .form-fields {
    display: flex;
    flex-direction: column;

    label {
      font-family: "Blinker", sans-serif;
      font-weight: 500;
      margin-bottom: 0.2rem;
      color: #969464;
    }

    input {
      width: ${props => (props.spanWidth ? "100%" : "12rem")};
      max-width: ${props => !props.spanWidth && "12rem"};
      min-width: ${props => !props.spanWidth && "12rem"};
      border: 0.1rem solid #969464;
      font-size: 0.9rem;
      padding-left: 0.2rem;
      margin-bottom: ${props => (props.inputMarginBottom ? "1.4rem" : "0rem")};
    }

    .input-error {
      color: red;
    }

    .form-button {
      background: blue;
    }
  }

  #tag-input-fields-container {
    overflow-y: scroll;
    padding: 1.4rem;

    .tag-input-container {
      display: flex;
      align-items: center;
      width: 13.8rem;
      margin-bottom: 1rem;

      .xicon-container {
        display: flex;
        align-items: center;
        height: 100%;

        svg {
          width: 0.7rem;
          height: 0.7rem;
          margin-left: 1rem;
          margin-bottom: 0;
        }
      }
    }
  }

  button {
    margin-left: ${props => (props.noPadding ? "1.4rem" : "0rem")};
  }
`

export default StyledForm
