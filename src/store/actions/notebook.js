export const SET_CREATED_NOTEBOOK = "SET_CREATED_NOTEBOOK"
export const SET_NOTEBOOK = "SET_NOTEBOOK"
export const SET_NOTEBOOK_LIST = "SET_NOTEBOOK_LIST"
export const SET_DELETED_NOTEBOOK = "SET_DELETED_NOTEBOOK"
export const LIST_SHARED_NOTEBOOKS = "LIST_SHARED_NOTEBOOKS"
export const SET_CREATE_NOTEBOOK_ERROR = "SET_CREATE_NOTEBOOK_ERROR"
export const SET_NOTEBOOK_LIST_ERROR = "SET_NOTEBOOK_LIST_ERROR"
export const SET_DELETE_NOTEBOOK_ERROR = "SET_DELETE_NOTEBOOK_ERROR"
export const SET_LIST_SHARED_NOTEBOOKS_ERROR = "SET_LIST_SHARED_NOTEBOOKS_ERROR"

export const setCreatedNotebook = ({ data }) => ({
  type: SET_CREATED_NOTEBOOK,
  payload: data,
  meta: {
    trigger:
      "POST to /api/notebook was successful and created notebook will be added to \
              the reducer's notebooks.",
  },
})

export const setNotebook = ({ data }) => ({
  type: SET_NOTEBOOK,
  payload: data,
  meta: {
    trigger:
      "GET to /api/notebook/sub-categories was successful and retrieved notebook will be added to \
              the reducer's notebooks.",
  },
})

export const setCreateNotebookError = ({ response: { data } }) => ({
  type: SET_CREATE_NOTEBOOK_ERROR,
  payload: data,
  meta: {
    trigger:
      "Server failed to create notebook || User acknowledged/fixed/closed error.",
  },
})

export const setNotebookList = ({ data }) => ({
  type: SET_NOTEBOOK_LIST,
  payload: data,
  meta: {
    trigger:
      "POST to /api/notebook was successful and created notebook will be added to \
              the reducer's notebooks.",
  },
})

export const setNotebookListError = ({ response: { data } }) => ({
  type: SET_NOTEBOOK_LIST_ERROR,
  payload: data,
  meta: {
    trigger: "Server failed to list notebooks.",
  },
})

export const setDeletedNotebook = ({ data }) => ({
  type: SET_DELETED_NOTEBOOK,
  payload: data,
  meta: {
    trigger:
      "POST to /api/notebook was successful and deleted notebook will be added to \
              the reducer's notebooks.",
  },
})

export const setDeleteNotebookError = ({ response: { data } }) => ({
  type: SET_DELETE_NOTEBOOK_ERROR,
  payload: data,
  meta: {
    trigger: "Server failed to delete notebook.",
  },
})
