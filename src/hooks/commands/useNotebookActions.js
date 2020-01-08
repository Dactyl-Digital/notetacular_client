import { useDispatch } from "react-redux"
import { apiRequest } from "../../store/actions/api"
import { CREATE_NOTEBOOK, LIST_NOTEBOOKS } from "../../store/actions/ui"
import {
  setCreatedNotebook,
  setCreateNotebookError,
  setNotebookList,
  setNotebookListError,
  setDeletedNotebook,
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

const deleteNotebookSuccess = dispatch => response => {
  dispatch(setDeletedNotebook(response))
}

const deleteNotebookError = dispatch => error => {
  dispatch(setDeleteNotebookError(error))
}

export function useNotebookActions() {
  const dispatch = useDispatch()

  return {
    createNotebook: createNotebook(dispatch),
    listNotebooks: listNotebooks(dispatch),
    deleteNotebook: deleteNotebook(dispatch),
  }
}
