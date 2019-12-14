import React from "react"
import styled from "styled-components"

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 14rem;
  min-height: 14rem;
  max-height: 14rem;
  padding: 1.4rem;
  padding-bottom: 0;

  #form-fields {
    display: flex;
    flex-direction: column;

    label {
      font-family: "Blinker", sans-serif;
      font-weight: 500;
      margin-bottom: 0.2rem;
      color: #969464;
    }

    input {
      width: 12rem;
      min-width: 12rem;
      max-width: 12rem;
      border: 0.1rem solid #969464;
      color: #222;
      font-size: 0.9rem;
      padding-left: 0.2rem;
    }

    .form-button {
      background: blue;
    }
  }
  button {
    margin-left: 0;
  }
`

export default StyledForm
