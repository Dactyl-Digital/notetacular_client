import React from "react"
import styled from "styled-components"
import Tag from "./tag"
import addIcon from "../../../assets/icons/add.svg"

const Container = styled.div`
  display: flex;
  align-items: center;

  .tag-list {
    display: flex;
    justify-content: space-between;
    width: 20rem;
    overflow-x: hidden;
  }

  .add-icon {
    width: 1.2rem;
    height: 1.2rem;
    padding-left: 0.6rem;
  }
`

// TODO: Add click and drag.
const Tags = ({ tags }) => (
  <Container>
    <div className="tag-list">
      {tags.map(tag => (
        <Tag>{tag}</Tag>
      ))}
    </div>
    <div className="add-icon">
      <img src={addIcon} />
    </div>
  </Container>
)

export default Tags
