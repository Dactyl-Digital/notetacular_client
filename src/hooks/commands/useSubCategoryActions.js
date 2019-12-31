import { useDispatch } from "react-redux"
import { apiRequest } from "../../store/actions/api"
import {
  setCreatedSubCategory,
  setCreateSubCategoryError,
  setSubCategoryList,
  setSubCategoryListError,
  removeDeletedSubCategory,
  setDeleteSubCategoryError,
} from "../../store/actions/subCategory"
import { SUB_CATEGORY_URL, LIST_SUB_CATEGORIES_URL } from "../../api-endpoints"

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
    deleteSubCategory: deleteSubCategory(dispatch),
  }
}
