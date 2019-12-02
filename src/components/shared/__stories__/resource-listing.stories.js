import React from "react"
import styled from "styled-components"
import { action } from "@storybook/addon-actions"
import ResourceListing from "../resource-listing"

const Container = styled.div`
  width: 43rem;
`

export default {
  component: ResourceListing,
  title: "ResourceListing",
}

export const notebookListing = () => (
  <Container>
    <ResourceListing
      key="1"
      title="Elixir"
      link={`notebook/1/sub-categories`}
    />
  </Container>
)
