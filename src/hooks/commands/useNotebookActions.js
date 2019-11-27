import { useDispatch } from "react-redux"
import { apiRequest } from "../../store/actions/api"
import {
  setCreatedNotebook,
  setCreateNotebookError,
  setNotebookList,
  setNotebookListError,
} from "../../store/actions/notebook"
import { CREATE_NOTEBOOK_URL, LIST_NOTEBOOKS_URL } from "../../api-endpoints"

export const createNotebook = dispatch => createNotebookData => {
  dispatch(
    apiRequest({
      method: "POST",
      url: CREATE_NOTEBOOK_URL,
      payload: createNotebookData,
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

export function useNotebookActions() {
  const dispatch = useDispatch()

  return {
    createNotebook: createNotebook(dispatch),
    listNotebooks: listNotebooks(dispatch),
  }
}
