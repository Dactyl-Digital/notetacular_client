import axios from "axios"
import { API_URL } from "../../api-endpoints"
// import { toggleLoader } from "../actions/ui"

const API_REQUEST = "API_REQUEST"

// const dispatchToggleLoader = (dispatch, bool, { method, url }) =>
//   dispatch(toggleLoader({ loaderVisible: bool, trigger: `${method} ${url}` }))

const makeRequest = (
  dispatch,
  { payload },
  { method, url, onSuccess, onError }
) => {
  if (method === "POST") {
    // TODO: might break these out into individual functions as
    // postRequest, getRequest, etc... if generalizing it
    // via the method turns out to be a pain.
    // dispatchToggleLoader(dispatch, true, { method, url })
    return axios
      .post(`${API_URL}${url}`, payload)
      .then(function(response) {
        console.log("post success response! ", response)
        // dispatchToggleLoader(dispatch, false, { method, url })
        console.log("the success data: ", response.data)
        onSuccess(response.data)
      })
      .catch(function(error) {
        onError({ error })
      })
  }
  if (method === "GET") {
    // dispatchToggleLoader(dispatch, true, { method, url })
    return axios
      .get(`${API_URL}${url}`, {
        params: {
          lat: payload.lat,
          lng: payload.lng,
        },
      })
      .then(function(response) {
        console.log("get success response! ", response)
        // dispatchToggleLoader(dispatch, false, { method, url })
        console.log("the success data: ", response.data)
        onSuccess(response.data)
      })
      .catch(function(error) {
        onError({ error })
      })
  }
}

export const apiMiddleware = ({ dispatch }) => next => action => {
  console.log("Inside the middleware w/ action: ", action)
  if (action.type === API_REQUEST) {
    console.log("action.type === API_REQUEST")
    return makeRequest(dispatch, action, action.meta)
  }
  console.log("calling next(action) in middleware")
  next(action)
}
