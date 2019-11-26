import React from "react"
import styled from "styled-components"
import pencilIcon from "../../../assets/icons/pencil-edit-button.svg"
import bookIcon from "../../../assets/icons/open-book.svg"
import trashIcon from "../../../assets/icons/bin.svg"

const Container = styled.div`
  padding: 0.6rem 0;
  border: 2px solid #222;
  width: 100%;
  border-left: 1px solid #aaa;
  border-right: 1px solid #aaa;

  .options-icons-container {
    display: flex;
  }

  .options-icons-container:first-child {
    margin-left: 1rem;
  }

  img {
    width: 1.2rem;
    height: 1.2rem;
    margin-left: 1rem;
  }
`

const Options = ({ readOnly, handleOptionClick }) => (
  <Container>
    <div className="options-icons-container">
      <button onClick={() => handleOptionClick("TOGGLE_READ_ONLY")}>
        {readOnly ? <img src={pencilIcon} /> : <img src={bookIcon} />}
      </button>
      <button onClick={() => handleOptionClick("DELETE")}>
        <img src={trashIcon} />
      </button>
    </div>
  </Container>
)

export default Options
