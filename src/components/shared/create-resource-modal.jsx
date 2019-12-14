import React, { useState } from "react"
import styled from "styled-components"
import Modal from "./modal"
import XIcon from "./icons/x-icon"
import AddIcon from "./icons/add-icon"
import Button from "./button"

const Container = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
  /* align-items: center; */
  position: relative;
  width: 40vw;
  min-width: 24rem;
  max-width: 34rem;
  background: #fcfcfc;
  border-radius: 5px;
  box-shadow: 0rem 0.1rem 1rem rgba(255, 255, 255, 70%);

  #modal-header {
    display: flex;
  }

  #form-heading {
    display: flex;
    justify-content: space-between;
    padding: 0.8rem 1.4rem;
    border-bottom: 0.15rem solid rgb(150, 148, 148, 20%);

    h2 {
      font-family: "Blinker", sans-serif;
      font-weight: 500;
      font-size: 1.6rem;
      color: #969494;
      margin: 0;
    }
  }

  #close-modal-x {
    display: flex;
    align-items: center;
  }

  form {
    display: flex;
    flex-direction: column;
  }
`

const CreateResourceModal = ({
  children,
  action,
  resource,
  IconComponent,
  buttonType,
}) => {
  return (
    <Modal
      // action={action}
      resource={resource}
      IconComponent={IconComponent}
      buttonType={buttonType}
    >
      {toggleShowModal => (
        <Container>
          <div id="form-heading">
            <div id="modal-header">
              <h2>{action ? `${action} ${resource}` : `${resource}`}</h2>
              {resource === "Timers" && (
                <Button type="ADD" size="SMALL">
                  <AddIcon />
                </Button>
              )}
            </div>

            <div id="close-modal-x" onClick={toggleShowModal}>
              <XIcon color="#969494" />
            </div>
          </div>
          {children(toggleShowModal)}
        </Container>
      )}
    </Modal>
  )
}

export default CreateResourceModal
