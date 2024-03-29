import React from "react"
import { action } from "@storybook/addon-actions"
import Modal from "../modal"

export default {
  component: Modal,
  title: "Modal",
}

export const modal = () => (
  <Modal resource="Notebook">
    {toggleShowModal => (
      <form
        onSubmit={e => {
          e.preventDefault()
          toggleShowModal(false)
        }}
      >
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={""}
          onChange={() => console.log("input value changed")}
        />
        <button>Submit!</button>
      </form>
    )}
  </Modal>
)
