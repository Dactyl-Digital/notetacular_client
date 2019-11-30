import React, { useState, useEffect } from "react"
import { useNotebook } from "../../../hooks/queries/useNotebook"
import { useSubCategory } from "../../../hooks/queries/useSubCategory"
import { useSubCategoryActions } from "../../../hooks/commands/useSubCategoryActions"
import Heading from "../../shared/heading"
import ResourceListing from "../../shared/resource-listing"
import Modal from "../../shared/modal"

const SubCategoryList = ({ notebookId }) => {
  const { notebooks } = useNotebook()
  const { subCategories, listSubCategoriesOffset } = useSubCategory()
  const { createSubCategory, listSubCategories } = useSubCategoryActions()
  const [title, setTitle] = useState(false)
  const [showCreateSubCategoryModal, setShowCreateSubCategoryModal] = useState(
    false
  )

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
    <div
      style={{
        display: "flex",
        flex: "1",
        justifyContent: "space-between",
        borderBottom: "1px solid #d1c1e0",
      }}
    >
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
  )
}

export default SubCategoryList
