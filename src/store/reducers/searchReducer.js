import {
  CLEAR_SEARCH_RESULTS,
  SET_SEARCH_RESULTS,
  SET_SEARCH_ERROR,
} from "../actions/search"
// import {helperFunction} from './helpers'

export const searchInitialState = {
  searchResults: [],
  offset: 0,
  paginationEnd: false,
  totalResults: 0,
  searchError: null,
}

export default function searchReducer(
  searchState = searchInitialState,
  { type, payload }
) {
  if (type === CLEAR_SEARCH_RESULTS) {
    return { ...searchInitialState }
  }
  if (type === SET_SEARCH_RESULTS) {
    let paginationEnd = false
    if (payload.data.num_rows !== 10) {
      paginationEnd = true
    }
    return {
      ...searchState,
      searchResults: [
        ...searchState.searchResults,
        ...payload.data.search_results,
      ],
      offset: searchState.offset + 10,
      totalResults: searchState.totalResults + payload.data.num_rows,
      paginationEnd,
    }
  }
  if (type === SET_SEARCH_ERROR) {
    return { ...searchState, searchError: payload }
  }
  return searchState
}
