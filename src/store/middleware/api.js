import axios from "axios"
import { toggleLoader } from "../actions/ui"

const API_REQUEST = "API_REQUEST"
const VALID_SESSION = "VALID_SESSION"

const invalidSession = ({ response: { data } }) => {
  console.log("invalidSession running")
  if (data.hasOwnProperty("message") && data.message === "Invalid session") {
    return {
      type: "INVALID_SESSION",
      payload: {},
      meta: {
        trigger: "User's cookie session has expired.",
      },
    }
  }
  return VALID_SESSION
}

const dispatchToggleLoader = (dispatch, bool, { method, url }) =>
  dispatch(toggleLoader({ loading: bool, trigger: `${method} ${url}` }))

const makeRequest = (
  dispatch,
  { payload },
  { method, url, onSuccess, onError }
) => {
  dispatchToggleLoader(dispatch, true, { method, url })
  if (method === "GET") {
    axios
      .get(url, {
        params: payload,
      })
      .then(function(response) {
        dispatchToggleLoader(dispatch, false, { method, url })
        onSuccess(response)
      })
      .catch(function(error) {
        console.log("the error in GET")
        console.log(error)
        if (
          error.hasOwnProperty("message") &&
          error.message === "Network Error"
        ) {
          return onError({
            response: {
              data: { message: "An error occured with the network." },
            },
          })
        }
        dispatchToggleLoader(dispatch, false, { method, url })
        const result = invalidSession(error)
        if (result === VALID_SESSION) return onError(error)
        dispatch(result)
      })
  }
  if (method === "POST") {
    // TODO: might break these out into individual functions as
    // postRequest, getRequest, etc... if generalizing it
    // via the method turns out to be a pain.
    // dispatchToggleLoader(dispatch, true, { method, url })
    return axios
      .post(url, payload)
      .then(function(response) {
        dispatchToggleLoader(dispatch, false, { method, url })
        onSuccess(response)
      })
      .catch(function(error) {
        // DOC:
        // Status Code 400 Err Response comes back as:
        // error.response.data.errors = {
        //   username: ["That username is already taken"]
        // }
        // Status Code 500 Err Response comes back as:
        // error.response.data = {
        //   message: "Oops... Something went wrong."
        // }
        console.log("the error in POST")
        console.dir(error)

        if (
          error.hasOwnProperty("message") &&
          error.message === "Network Error"
        ) {
          return onError({
            response: {
              data: { message: "An error occured with the network." },
            },
          })
        }
        dispatchToggleLoader(dispatch, false, { method, url })
        const result = invalidSession(error)
        if (result === VALID_SESSION) return onError(error)
        dispatch(result)
      })
  }
  if (method === "PUT") {
    axios
      .put(url, payload)
      .then(function(response) {
        dispatchToggleLoader(dispatch, false, { method, url })
        onSuccess(response)
      })
      .catch(function(error) {
        console.log("the error in PUT")
        console.log(error)
        if (
          error.hasOwnProperty("message") &&
          error.message === "Network Error"
        ) {
          return onError({
            response: {
              data: { message: "An error occured with the network." },
            },
          })
        }
        dispatchToggleLoader(dispatch, false, { method, url })
        const result = invalidSession(error)
        if (result === VALID_SESSION) return onError(error)
        dispatch(result)
      })
  }
  if (method === "PATCH") {
    axios
      .patch(url, payload)
      .then(function(response) {
        dispatchToggleLoader(dispatch, false, { method, url })
        onSuccess(response)
      })
      .catch(function(error) {
        console.log("the error in PATCH")
        console.log(error)
        if (
          error.hasOwnProperty("message") &&
          error.message === "Network Error"
        ) {
          return onError({
            response: {
              data: { message: "An error occured with the network." },
            },
          })
        }
        dispatchToggleLoader(dispatch, false, { method, url })
        const result = invalidSession(error)
        if (result === VALID_SESSION) return onError(error)
        dispatch(result)
      })
  }
  if (method === "DELETE") {
    axios
      .delete(url)
      .then(function(response) {
        dispatchToggleLoader(dispatch, false, { method, url })
        onSuccess(response)
      })
      .catch(function(error) {
        console.log("the error in DELETE")
        console.log(error)
        if (
          error.hasOwnProperty("message") &&
          error.message === "Network Error"
        ) {
          return onError({
            response: {
              data: { message: "An error occured with the network." },
            },
          })
        }
        dispatchToggleLoader(dispatch, false, { method, url })
        const result = invalidSession(error)
        if (result === VALID_SESSION) return onError(error)
        dispatch(result)
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
