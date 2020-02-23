import {
  SET_CREATED_NOTEBOOK,
  SET_NOTEBOOK,
  SET_NOTEBOOK_LIST,
  LIST_SHARED_NOTEBOOKS,
  SET_CREATE_NOTEBOOK_ERROR,
  SET_NOTEBOOK_LIST_ERROR,
  SET_LIST_SHARED_NOTEBOOKS_ERROR,
  REMOVE_DELETED_NOTEBOOK,
  SET_DELETE_NOTEBOOK_ERROR,
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
  deleteNotebookError: null,
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
      notebooks: {
        ...notebookState.notebooks,
        ...normalizeSingle(payload),
      },
      notebookIds: [payload.data.id, ...notebookState.notebookIds],
    }
  }
  if (type === SET_NOTEBOOK) {
    return {
      ...notebookState,
      notebooks: {
        ...notebookState.notebooks,
        ...normalizeSingle(payload),
      },
      notebookIds: [payload.data.id, ...notebookState.notebookIds],
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
    const { notebooks } = notebookState

    delete notebooks[payload.notebook_id]

    const { notebookIds } = notebookState
    const position = notebookIds.indexOf(payload.notebook_id)
    const updatedIdList = notebookIds
      .slice(0, position)
      .concat(notebookIds.slice(position + 1))

    return {
      ...notebookState,
      notebooks,
      notebookIds: updatedIdList,
    }
  }
  if (type === SET_DELETE_NOTEBOOK_ERROR) {
    return {
      ...notebookState,
      deleteNotebookError: payload,
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
