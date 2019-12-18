import {
  SET_CREATED_NOTEBOOK,
  SET_NOTEBOOK_LIST,
  LIST_SHARED_NOTEBOOKS,
  SET_CREATE_NOTEBOOK_ERROR,
  SET_NOTEBOOK_LIST_ERROR,
  SET_LIST_SHARED_NOTEBOOKS_ERROR,
} from "../actions/notebook"
// import {helperFunction} from '../helpers'

const listNotebooksOffset = JSON.parse(
  localStorage.getItem("listNotebooksOffset")
)
const notebooks = JSON.parse(localStorage.getItem("notebooks"))
const notebooksPaginationEnd = JSON.parse(
  localStorage.getItem("notebooksPaginationEnd")
)

export const notebookInitialState = {
  listNotebooksOffset: listNotebooksOffset ? listNotebooksOffset : 0,
  notebooks: notebooks ? notebooks : {},
  notebooksPaginationEnd: notebooksPaginationEnd
    ? notebooksPaginationEnd
    : false,
  listSharedNotebooksOffset: 0,
  sharedNotebooks: {},
  createNotebookError: null,
  notebookListError: null,
  listSharedNotebooksError: null,
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
    const result = {
      ...notebookState,
      notebooks: { ...notebookState.notebooks, ...normalizeSingle(payload) },
    }

    return result
  }
  if (type === SET_NOTEBOOK_LIST) {
    return notebookListNewState(notebookState, payload)
  }
  // if (type === LIST_SHARED_NOTEBOOKS) {
  //   return { ...notebookState, successfulSignup: true }
  // }
  if (type === SET_CREATE_NOTEBOOK_ERROR) {
    return { ...notebookState, createNotebookError: payload }
  }
  if (type === SET_NOTEBOOK_LIST_ERROR) {
    return { ...notebookState, notebookListError: payload }
  }
  // if (type === SET_LIST_SHARED_NOTEBOOKS_ERROR) {
  //   return { ...notebookState, signinError: payload.errors }
  // }
  return notebookState
}

const notebookListNewState = (notebookState, payload) => {
  const notebooksPaginationEnd = payload.data.notebooks.length !== 20
  return {
    ...notebookState,
    notebooks: {
      ...notebookState.notebooks,
      ...normalizeNotebooks(payload),
    },
    listNotebooksOffset: notebookState.listNotebooksOffset + 20,
    notebooksPaginationEnd,
  }
}
