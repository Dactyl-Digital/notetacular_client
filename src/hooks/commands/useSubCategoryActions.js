import { useDispatch } from "react-redux"
import { apiRequest } from "../../store/actions/api"
import { setNotebook } from "../../store/actions/notebook"
import {
  setCreatedSubCategory,
  setCreateSubCategoryError,
  setSubCategoryList,
  setSubCategoryListError,
  setNotebooksSubCategories,
  setNotebooksSubCategoriesError,
  removeDeletedSubCategory,
  setDeleteSubCategoryError,
} from "../../store/actions/subCategory"
import {
  SUB_CATEGORY_URL,
  LIST_SUB_CATEGORIES_URL,
  LIST_NOTEBOOKS_SUB_CATEGORIES_URL,
} from "../../api-endpoints"

export const createSubCategory = dispatch => createSubCategoryData => {
  dispatch(
    apiRequest({
      method: "POST",
      url: SUB_CATEGORY_URL,
      payload: createSubCategoryData,
      onSuccess: createSubCategorySuccess(dispatch),
      onError: createSubCategoryError(dispatch),
    })
  )
}

const createSubCategorySuccess = dispatch => response => {
  dispatch(setCreatedSubCategory(response))
}

const createSubCategoryError = dispatch => error => {
  dispatch(setCreateSubCategoryError(error))
}

// Listing sub categories requires this to be sent on the request body:
// sub_category_id_list
export const listSubCategories = dispatch => ({
  offset,
  sub_category_id_list,
}) => {
  dispatch(
    apiRequest({
      method: "GET",
      url: `${LIST_SUB_CATEGORIES_URL}${offset}`,
      payload: { sub_category_id_list },
      onSuccess: listSubCategoriesSuccess(dispatch),
      onError: listSubCategoriesError(dispatch),
    })
  )
}

const listSubCategoriesSuccess = dispatch => response => {
  dispatch(setSubCategoryList(response))
}

const listSubCategoriesError = dispatch => error => {
  dispatch(setSubCategoryListError(error))
}

// IMMEDIATE TODO: Finish implementing
// 1. Need to create a controller on the backend which will return:
// The Notebook with updated_at, title, owner_id, inserted_at, id, sub_categories (array of it's associated sub_categories)
// And the all of the sub categories necessary in order to display it as the last entry in the ui... Then the user can fetch the rest
// via the loadMoreBtn/scroll.

// MAKE THE GET REQUEST TO:
// "api/notebook/sub-categories"
// With PARAMS:
// notebook_id, sub_category_id
// AND IT IS DONE....
export const listNotebooksSubCategories = dispatch => ({
  notebookId,
  limit,
  offset,
}) => {
  dispatch(
    apiRequest({
      method: "GET",
      url: LIST_NOTEBOOKS_SUB_CATEGORIES_URL,
      payload: { notebook_id: notebookId, limit, offset },
      onSuccess: listNotebooksSubCategoriesSuccess(dispatch),
      onError: listNotebooksSubCategoriesError(dispatch),
    })
  )
}

export const listNotebooksSubCategoriesSuccess = dispatch => response => {
  console.log("response.data.data")
  console.log(response.data.data.notebook)
  dispatch(setNotebook({ data: { data: response.data.data.notebook } }))
  dispatch(
    setNotebooksSubCategories({
      data: {
        data: { sub_categories: response.data.data.sub_categories },
      },
    })
  )
}

export const listNotebooksSubCategoriesError = dispatch => error => {
  dispatch(setNotebooksSubCategoriesError(error))
}

export const deleteSubCategory = dispatch => ({
  notebook_id,
  sub_category_id,
}) => {
  dispatch(
    apiRequest({
      method: "DELETE",
      url: `${SUB_CATEGORY_URL}/${sub_category_id}`,
      payload: {},
      onSuccess: deleteSubCategorySuccess({ notebook_id, sub_category_id })(
        dispatch
      ),
      onError: deleteSubCategoryError(dispatch),
    })
  )
}

const deleteSubCategorySuccess = ({
  notebook_id,
  sub_category_id,
}) => dispatch => _response => {
  dispatch(removeDeletedSubCategory({ notebook_id, sub_category_id }))
}

const deleteSubCategoryError = dispatch => error => {
  dispatch(setDeleteSubCategoryError(error))
}

export function useSubCategoryActions() {
  const dispatch = useDispatch()

  return {
    createSubCategory: createSubCategory(dispatch),
    listSubCategories: listSubCategories(dispatch),
    listNotebooksSubCategories: listNotebooksSubCategories(dispatch),
    deleteSubCategory: deleteSubCategory(dispatch),
  }
}
