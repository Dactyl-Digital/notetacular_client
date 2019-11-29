import {
  SET_CREATED_SUB_CATEGORY,
  SET_SUB_CATEGORY_LIST,
  LIST_SHARED_SUB_CATEGORIES,
  SET_CREATE_SUB_CATEGORY_ERROR,
  SET_SUB_CATEGORY_LIST_ERROR,
  SET_LIST_SHARED_SUB_CATEGORY_ERROR,
} from "../actions/subCategory"
// import {helperFunction} from '../helpers'

export const subCategoryInitialState = {
  listSubCategoriesOffset: 0,
  subCategories: {},
  listSharedSubCategoriesOffset: 0,
  sharedSubCategories: {},
  createSubCategoryError: null,
  subCategoryListError: null,
  listSharedSubCategoriesError: null,
}

const normalizeSingle = ({ data }) => ({
  [data.id]: {
    ...data,
  },
})

// TODO: Move this into a helper folder.
const normalize = key => ({ data }) =>
  data[key].reduce((acc, resource) => {
    acc[resource.id] = resource
    return acc
  }, {})

const normalizeSubCategories = normalize("sub_categories")

export default function subCategoryReducer(
  subCategoryState = subCategoryInitialState,
  { type, payload }
) {
  if (type === SET_CREATED_SUB_CATEGORY) {
    return {
      ...subCategoryState,
      subCategories: {
        ...subCategoryState.subCategories,
        ...normalizeSingle(payload),
      },
    }
  }
  if (type === SET_SUB_CATEGORY_LIST) {
    return subCategoryListNewState(subCategoryState, payload)
  }
  // if (type === LIST_SHARED_SUB_CATEGORIES) {
  //   return { ...subCategoryState, successfulSignup: true }
  // }
  if (type === SET_CREATE_SUB_CATEGORY_ERROR) {
    return { ...subCategoryState, createSubCategoryError: payload }
  }
  if (type === SET_SUB_CATEGORY_LIST_ERROR) {
    return { ...subCategoryState, subCategoryListError: payload }
  }
  // if (type === SET_LIST_SHARED_subCategoryS_ERROR) {
  //   return { ...subCategoryState, signinError: payload.errors }
  // }
  return subCategoryState
}

const subCategoryListNewState = (subCategoryState, payload) => ({
  ...subCategoryState,
  subCategories: {
    ...subCategoryState.subCategories,
    ...normalizeSubCategories(payload),
  },
  listSubCategoriesOffset: subCategoryState.listSubCategoriesOffset + 20,
})
