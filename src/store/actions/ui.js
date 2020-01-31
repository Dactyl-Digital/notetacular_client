export const SET_LOADING = "SET_LOADING"

// loadingResource Types
export const CREATE_NOTEBOOK = "CREATE_NOTEBOOK"
export const LIST_NOTEBOOKS = "LIST_NOTEBOOKS"
export const CREATE_SUB_CATEGORY = "CREATE_SUB_CATEGORY"
export const LIST_SUB_CATEGORIES = "LIST_SUB_CATEGORIES"
export const CREATE_TOPIC = "CREATE_TOPIC"
export const LIST_TOPICS = "LIST_TOPICS"
export const CREATE_NOTE = "CREATE_NOTE"
export const LIST_NOTES = "LIST_NOTES"
export const UPDATE_NOTE_CONTENT = "UPDATE_NOTE_CONTENT"
export const CREATE_NOTE_TIMER = "CREATE_NOTE_TIMER"
export const LIST_NOTE_TIMERS = "LIST_NOTE_TIMERS"
export const LIST_SEARCH_RESULTS = "LIST_SEARCH_RESULTS"

export const toggleLoader = ({ loading, loadingResource, trigger }) => ({
  type: SET_LOADING,
  payload: { loading, loadingResource },
  meta: {
    trigger: `Loading - ${trigger}`,
  },
})
