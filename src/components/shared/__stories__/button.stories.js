import React from "react"
import { action } from "@storybook/addon-actions"
import Button from "../button"

export default {
  component: Button,
  title: "Button",
}

export const createButton = () => <Button type="CREATE">Create New Note</Button>
export const stopButton = () => <Button>Stop</Button>
