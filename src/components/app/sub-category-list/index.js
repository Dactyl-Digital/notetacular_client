import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useNotebook } from "../../../hooks/queries/useNotebook"
import { useSubCategory } from "../../../hooks/queries/useSubCategory"
import { useSubCategoryActions } from "../../../hooks/commands/useSubCategoryActions"
import Heading from "../../shared/heading"
import Sidebar from "../../shared/sidebar"
import ResourceListing from "../../shared/resource-listing"
import Modal from "../../shared/modal"

const Container = styled.div`
  display: flex;

  #main-content {
    /* TODO: For now this at least looks good on large screens... */
    padding: 0 8vw;
    padding-top: 2rem;
    width: 100%;
  }
`

const SubCategoryList = ({ notebookId }) => {
  const { notebooks } = useNotebook()
  const { subCategories, listSubCategoriesOffset } = useSubCategory()
  const { createSubCategory, listSubCategories } = useSubCategoryActions()
  const [title, setTitle] = useState(false)

  useEffect(() => {
    const subCategoryIdList = notebooks[notebookId].sub_categories
    if (subCategoryIdList.length > 0) {
      listSubCategories({
        offset: listSubCategoriesOffset,
        sub_category_id_list: subCategoryIdList,
      })
    }
  }, [])

  const handleCreateNewSubCategory = e => {
    createSubCategory({ title, notebook_id: Number(notebookId) })
    setTitle("")
  }

  return (
    <Container>
      <Sidebar />
      <div id="main-content">
        <Heading title="Sub Categories" />
        {Object.keys(subCategories).map(key => (
          <ResourceListing
            key={subCategories[key].id.toString()}
            title={subCategories[key].title}
            link={`sub-category/${subCategories[key].id}/topics`}
          />
        ))}
        <Modal resource="Sub Category">
          {toggleShowModal => (
            <form
              onSubmit={e => {
                e.preventDefault()
                handleCreateNewSubCategory()
                toggleShowModal(false)
              }}
            >
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <button>Submit!</button>
            </form>
          )}
        </Modal>
      </div>
    </Container>
  )
}

export default SubCategoryList
