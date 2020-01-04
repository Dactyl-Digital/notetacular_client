import { useDispatch } from "react-redux"
import { apiRequest } from "../../store/actions/api"
import {
  clearSearchResults,
  setSearchResults,
  setSearchError,
} from "../../store/actions/search"
import { SEARCH_URL } from "../../api-endpoints"

export const clearSearch = dispatch => () => dispatch(clearSearchResults())

export const search = dispatch => ({ search_text, offset }) => {
  dispatch(
    apiRequest({
      method: "GET",
      url: SEARCH_URL,
      payload: { search_text, offset },
      onSuccess: searchSuccess(dispatch),
      onError: searchError(dispatch),
    })
  )
}

export const searchSuccess = dispatch => response => {
  dispatch(setSearchResults(response))
}

const searchError = dispatch => error => {
  dispatch(setSearchError(error))
}

export function useSearchActions() {
  const dispatch = useDispatch()

  return {
    clearSearch: clearSearch(dispatch),
    search: search(dispatch),
  }
}
