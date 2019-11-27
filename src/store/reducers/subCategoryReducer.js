import {
  SET_CREATED_SUB_CATEGORY,
  SET_SUB_CATEGORY_LIST,
  LIST_SHARED_SUB_CATEGORYS,
  SET_CREATE_SUB_CATEGORY_ERROR,
  SET_SUB_CATEGORY_LIST_ERROR,
  SET_LIST_SHARED_SUB_CATEGORY_ERROR,
} from "../actions/notebook"
// import {helperFunction} from '../helpers'

export const notebookInitialState = {
  listSubcategoriesOffset: 0,
  SubCategories: {},
  listSharedSubCategorysOffset: 0,
  sharedSubCategories: {},
  createSubCategoryError: null,
  SubCategoryListError: null,
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

const normalizeNotebooks = normalize("notebooks")

export default function notebookReducer(
  notebookState = notebookInitialState,
  { type, payload }
) {
  if (type === SET_CREATED_NOTEBOOK) {
    return {
      ...notebookState,
      notebooks: { ...notebookState.notebooks, ...normalizeSingle(payload) },
    }
  }
  if (type === SET_NOTEBOOK_LIST) {
    return notebookListNewState(notebookState, payload)
  }
  // if (type === LIST_SHARED_NOTEBOOKS) {
  //   return { ...notebookState, successfulSignup: true }
  // }
  if (type === SET_CREATE_NOTEBOOK_ERROR) {
    return { ...notebookState, signupError: payload }
  }
  if (type === SET_NOTEBOOK_LIST_ERROR) {
    return { ...notebookState, notebookListError: payload }
  }
  // if (type === SET_LIST_SHARED_NOTEBOOKS_ERROR) {
  //   return { ...notebookState, signinError: payload.errors }
  // }
  return notebookState
}

const notebookListNewState = (notebookState, payload) => ({
  ...notebookState,
  notebooks: {
    ...notebookState.notebooks,
    ...normalizeNotebooks(payload),
  },
  listNotebooksOffset: notebookState.listNotebooksOffset + 20,
})
