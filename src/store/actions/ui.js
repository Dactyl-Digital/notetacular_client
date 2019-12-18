export const SET_LOADING = "SET_LOADING"

export const toggleLoader = ({ loading, trigger }) => ({
  type: SET_LOADING,
  payload: { loading: loading },
  meta: {
    trigger: `Loading - ${trigger}`,
  },
})
