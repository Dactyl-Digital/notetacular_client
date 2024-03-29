import { useDispatch } from "react-redux"
import { apiRequest } from "../../store/actions/api"
import { CREATE_NOTEBOOK, LIST_NOTEBOOKS } from "../../store/actions/ui"
import {
  setCreatedNotebook,
  setCreateNotebookError,
  setNotebookList,
  setNotebookListError,
  removeDeletedNotebook,
  setDeleteNotebookError,
} from "../../store/actions/notebook"
import { NOTEBOOK_URL, LIST_NOTEBOOKS_URL } from "../../api-endpoints"

export const createNotebook = dispatch => createNotebookData => {
  dispatch(
    apiRequest({
      method: "POST",
      url: NOTEBOOK_URL,
      payload: createNotebookData,
      loadingResource: CREATE_NOTEBOOK,
      onSuccess: createNotebookSuccess(dispatch),
      onError: createNotebookError(dispatch),
    })
  )
}

const createNotebookSuccess = dispatch => response => {
  dispatch(setCreatedNotebook(response))
}

const createNotebookError = dispatch => error => {
  dispatch(setCreateNotebookError(error))
}

export const listNotebooks = dispatch => offset => {
  dispatch(
    apiRequest({
      method: "GET",
      url: `${LIST_NOTEBOOKS_URL}${offset}`,
      payload: {},
      loadingResource: LIST_NOTEBOOKS,
      onSuccess: listNotebooksSuccess(dispatch),
      onError: listNotebooksError(dispatch),
    })
  )
}

const listNotebooksSuccess = dispatch => response => {
  dispatch(setNotebookList(response))
}

const listNotebooksError = dispatch => error => {
  dispatch(setNotebookListError(error))
  setTimeout(setNotebookListError({ ...error, payload: null }), 3000)
}

export const deleteNotebook = dispatch => ({ notebook_id }) => {
  dispatch(
    apiRequest({
      method: "DELETE",
      url: `${NOTEBOOK_URL}/${notebook_id}`,
      payload: {},
      onSuccess: deleteNotebookSuccess(dispatch),
      onError: deleteNotebookError(dispatch),
    })
  )
}

// NOTE: You're handling these cases inconsistently... for the
// deleteSubCatSuccess you used a curried function where the UI passed
// in the notebook_id and subcat_id.
// I think I did that because I didn't want to fetch additional resources on the
// server. If that's the case then it's no problem to handle it that way.
const deleteNotebookSuccess = dispatch => response => {
  dispatch(removeDeletedNotebook(response))
}

const deleteNotebookError = dispatch => error => {
  // TODO: When I want to fine tune this later... Then this will need to be refactored.
  // dispatch(setDeleteNotebookError(error))
  dispatch({
    type: "SET_DELETE_NOTEBOOK_ERROR",
    payload: {
      message:
        "Can't delete notebook because it has sub categories associated with it!",
    },
    meta: {
      trigger: "Server failed to delete notebook.",
    },
  })
  setTimeout(() => {
    dispatch({
      type: "SET_DELETE_NOTEBOOK_ERROR",
      payload: null,
      meta: {
        trigger: "Server failed to delete notebook.",
      },
    })
  }, 3000)
}

export function useNotebookActions() {
  const dispatch = useDispatch()

  return {
    createNotebook: createNotebook(dispatch),
    clearCreateNotebookError: createNotebookError(dispatch),
    listNotebooks: listNotebooks(dispatch),
    deleteNotebook: deleteNotebook(dispatch),
  }
}
