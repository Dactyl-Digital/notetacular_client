import React from "react"
import { action } from "@storybook/addon-actions"
import Heading from "../heading.js"

export default {
  component: Heading,
  title: "Heading",
}

export const heading = () => <Heading title="Notebooks" />
