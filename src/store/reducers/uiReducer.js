import { SET_LOADING } from "../actions/ui"
// import {helperFunction} from '../helpers'

export const uiInitialState = {
  loading: false,
  loadingResource: null,
}

export default function uiReducer(uiState = uiInitialState, { type, payload }) {
  if (type === SET_LOADING) {
    return {
      ...uiState,
      loading: payload.loading,
      loadingResource: payload.loadingResource,
    }
  }
  return uiState
}
