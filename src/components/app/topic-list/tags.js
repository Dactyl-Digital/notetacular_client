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
      {tags !== null && tags.map(tag => <Tag>{tag}</Tag>)}
    </div>
    {/* TODO: Genericize /shared/Modal so that you can provide your own button and use that here */}
    <div onClick={() => console.log("CREATE_TAG")}>
      <AddIcon />
    </div>
  </Container>
)

export default Tags
