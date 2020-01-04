export const CLEAR_SEARCH_RESULTS = "CLEAR_SEARCH_RESULTS"
export const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS"
export const SET_SEARCH_ERROR = "SET_SEARCH_ERROR"

export const clearSearchResults = () => ({
  type: CLEAR_SEARCH_RESULTS,
  payload: {},
  meta: {
    trigger:
      "Clearing search results in order to facilitate the start of a new search term.",
  },
})

export const setSearchResults = ({ data }) => ({
  type: SET_SEARCH_RESULTS,
  payload: data,
  meta: {
    trigger:
      "GET to /api/note/search was successful and search result list will be added to \
              the reducer's search property.",
  },
})

export const setSearchError = ({ response: { data } }) => ({
  type: SET_SEARCH_ERROR,
  payload: data,
  meta: {
    trigger: "Server failed to list search results.",
  },
})
