import React from "react"
import styled from "styled-components"
import Tag from "./tag"
import AddIcon from "../../shared/icons/add-icon"

const Container = styled.div`
  display: flex;
  align-items: center;

  .tag-list {
    display: flex;
    justify-content: space-between;
    width: 14rem;
    border-radius: 25px;
    overflow-x: scroll;
  }

  svg {
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
    <AddIcon />
  </Container>
)

export default Tags
