import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useNotebook } from "../../../hooks/queries/useNotebook"
import { useSubCategory } from "../../../hooks/queries/useSubCategory"
import { useSubCategoryActions } from "../../../hooks/commands/useSubCategoryActions"
import Heading from "../../shared/heading"
import Sidebar from "../../shared/sidebar"
import ResourceListing from "../../shared/resource-listing"
import Modal from "../../shared/modal"
import CreateSubCategoryModal from "./create-sub-category-modal"

const Container = styled.div`
  display: flex;

  #main-content {
    /* TODO: For now this at least looks good on large screens... */
    padding: 0 8vw;
    padding-top: 2rem;
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
  }
`

const SubCategoryList = ({ notebookId }) => {
  const { notebooks } = useNotebook()
  const { subCategories, listSubCategoriesOffset } = useSubCategory()
  const { listSubCategories } = useSubCategoryActions()

  useEffect(() => {
    const subCategoryIdList = notebooks[notebookId].sub_categories
    if (subCategoryIdList.length > 0) {
      listSubCategories({
        offset: listSubCategoriesOffset,
        sub_category_id_list: subCategoryIdList,
      })
    }
  }, [])

  return (
    <Container>
      <Sidebar />
      <div id="main-content">
        <Heading title="Sub Categories" />
        <CreateSubCategoryModal />
        <div id="sub-category-list">
          {Object.keys(subCategories).map(key => (
            <ResourceListing
              key={subCategories[key].id.toString()}
              title={subCategories[key].title}
              link={`sub-category/${subCategories[key].id}/topics`}
            />
          ))}
        </div>
      </div>
    </Container>
  )
}

export default SubCategoryList
