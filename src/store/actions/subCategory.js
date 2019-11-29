export const SET_CREATED_SUB_CATEGORY = "SET_CREATED_SUB_CATEGORY"
export const SET_SUB_CATEGORY_LIST = "SET_SUB_CATEGORY_LIST"
export const LIST_SHARED_SUB_CATEGORIES = "LIST_SHARED_SUB_CATEGORIES"
export const SET_CREATE_SUB_CATEGORY_ERROR = "SET_CREATE_SUB_CATEGORY_ERROR"
export const SET_SUB_CATEGORY_LIST_ERROR = "SET_SUB_CATEGORY_LIST_ERROR"
export const SET_LIST_SHARED_SUB_CATEGORY_ERROR =
  "SET_LIST_SHARED_SUB_CATEGORY_ERROR"

export const setCreatedSubCategory = ({ data }) => ({
  type: SET_CREATED_SUB_CATEGORY,
  payload: data,
  meta: {
    trigger:
      "POST to /api/sub-category was successful and created sub category will be added to \
              the reducer's sub categories.",
  },
})

export const setCreateSubCategoryError = error => ({
  type: SET_CREATE_SUB_CATEGORY_ERROR,
  payload: error,
  meta: {
    trigger: "Server failed to create sub category.",
  },
})

export const setSubCategoryList = ({ data }) => ({
  type: SET_SUB_CATEGORY_LIST,
  payload: data,
  meta: {
    trigger:
      "POST to /api/sub-category was successful and created sub category will be added to \
              the reducer's sub categories.",
  },
})

export const setSubCategoryListError = ({ response: { data } }) => ({
  type: SET_SUB_CATEGORY_LIST_ERROR,
  payload: data,
  meta: {
    trigger: "Server failed to list sub categories.",
  },
})
