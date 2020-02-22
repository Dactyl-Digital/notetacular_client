import {
  SET_CREATED_NOTEBOOK,
  SET_NOTEBOOK,
  SET_NOTEBOOK_LIST,
  LIST_SHARED_NOTEBOOKS,
  SET_CREATE_NOTEBOOK_ERROR,
  SET_NOTEBOOK_LIST_ERROR,
  SET_LIST_SHARED_NOTEBOOKS_ERROR,
  REMOVE_DELETED_NOTEBOOK,
} from "../actions/notebook"
// import { helperFn } from "./helpers"

export const notebookInitialState = {
  listNotebooksOffset: 0,
  notebooks: {},
  notebookIds: [],
  notebooksPaginationEnd: false,
  listSharedNotebooksOffset: 0,
  sharedNotebooks: {},
  createNotebookError: null,
  notebookListError: null,
  listSharedNotebooksError: null,
}

const normalizeSingle = ({ data }) => {
  return {
    [data.id]: {
      ...data,
    },
  }
}

// TODO: Move this into a helper folder.
const normalize = key => (notebookState, { data }) =>
  data[key].reduce((acc, resource, i) => {
    if (i === 0) {
      acc["notebooks"] = { ...notebookState.notebooks, [resource.id]: resource }
      acc["notebookIds"] = [...notebookState.notebookIds, resource.id]
    } else {
      acc["notebooks"][resource.id] = resource
      acc["notebookIds"] = [...acc.notebookIds, resource.id]
    }
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
  if (type === SET_NOTEBOOK) {
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
    return { ...notebookState, createNotebookError: payload }
  }
  if (type === SET_NOTEBOOK_LIST_ERROR) {
    return { ...notebookState, notebookListError: payload }
  }
  if (type === REMOVE_DELETED_NOTEBOOK) {
    console.log("payload in REMOVE_DELETED_NOTEBOOK")
    console.log(payload)
    const { notebooks } = notebookState
    console.log("notebooks before delete")
    console.log(notebooks)
    delete notebooks[payload.notebook_id]
    console.log("notebooks after delete")
    console.log(notebooks)
    return {
      ...notebookState,
      notebooks,
    }
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
    ...normalizeNotebooks(notebookState, payload),
    // notebooks: {
    //   ...notebookState.notebooks,
    //   ,
    // },
    listNotebooksOffset: notebookState.listNotebooksOffset + 20,
    notebooksPaginationEnd,
  }
}
