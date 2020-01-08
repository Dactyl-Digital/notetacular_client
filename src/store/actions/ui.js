export const SET_LOADING = "SET_LOADING"

// loadingResource Types
export const CREATE_NOTEBOOK = "CREATE_NOTEBOOK"
export const LIST_NOTEBOOKS = "LIST_NOTEBOOKS"

export const toggleLoader = ({ loading, loadingResource, trigger }) => ({
  type: SET_LOADING,
  payload: { loading, loadingResource },
  meta: {
    trigger: `Loading - ${trigger}`,
  },
})
