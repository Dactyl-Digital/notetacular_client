import axios from "axios"
import { toggleLoader } from "../actions/ui"

// PRIORITY TODO: Status Code 500 errors return gobblydgook html response
// which gets set on the redux payload... Figure out how to meaningfully handle this
// in the context of the operation that was being performed...
// Also... Another TODO: You didn't implement the constraint that names be uniques under
// resources owned by a particular user.

// And yet another TODO... Loading indicator for when saving a note.

const API_REQUEST = "API_REQUEST"
const VALID_SESSION = "VALID_SESSION"

const invalidSession = ({ response: { data } }) => {
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

const dispatchToggleLoader = (
  dispatch,
  bool,
  { method, url, loadingResource }
) =>
  dispatch(
    toggleLoader({
      loading: bool,
      loadingResource,
      trigger: `${method} ${url}`,
    })
  )

const makeRequest = (
  dispatch,
  { payload, loadingResource },
  { method, url, onSuccess, onError }
) => {
  dispatchToggleLoader(dispatch, true, { method, url, loadingResource })
  if (method === "GET") {
    axios
      .get(url, {
        params: payload,
      })
      .then(function(response) {
        onSuccess(response)
        dispatchToggleLoader(dispatch, false, {
          method,
          url,
          loadingResource: null,
        })
      })
      .catch(function(error) {
        if (process.env.NODE_ENV === "development") {
          console.log("the error in GET")
          console.log(error)
        }
        if (
          error.hasOwnProperty("message") &&
          error.message === "Network Error"
        ) {
          onError({
            response: {
              data: { message: "An error occured with the network." },
            },
          })
          dispatchToggleLoader(dispatch, false, {
            method,
            url,
            loadingResource: null,
          })
          return
        }
        const result = invalidSession(error)
        if (result === VALID_SESSION) {
          onError(error)
          dispatchToggleLoader(dispatch, false, {
            method,
            url,
            loadingResource: null,
          })
          return
        }
        dispatchToggleLoader(dispatch, false, {
          method,
          url,
          loadingResource: null,
        })
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
        onSuccess(response)
        dispatchToggleLoader(dispatch, false, { method, url })
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

        if (process.env.NODE_ENV === "development") {
          console.log("the error in POST")
          console.log(error)
        }
        if (
          error.hasOwnProperty("message") &&
          error.message === "Network Error"
        ) {
          onError({
            response: {
              data: { message: "An error occured with the network." },
            },
          })
          dispatchToggleLoader(dispatch, false, {
            method,
            url,
            loadingResource: null,
          })
          return
        }
        const result = invalidSession(error)
        if (result === VALID_SESSION) {
          onError(error)
          dispatchToggleLoader(dispatch, false, {
            method,
            url,
            loadingResource: null,
          })
          return
        }
        dispatchToggleLoader(dispatch, false, {
          method,
          url,
          loadingResource: null,
        })
        dispatch(result)
      })
  }
  if (method === "PUT") {
    axios
      .put(url, payload)
      .then(function(response) {
        onSuccess(response)
        dispatchToggleLoader(dispatch, false, {
          method,
          url,
          loadingResource: null,
        })
      })
      .catch(function(error) {
        if (process.env.NODE_ENV === "development") {
          console.log("the error in PUT")
          console.log(error)
        }
        if (
          error.hasOwnProperty("message") &&
          error.message === "Network Error"
        ) {
          onError({
            response: {
              data: { message: "An error occured with the network." },
            },
          })
          dispatchToggleLoader(dispatch, false, {
            method,
            url,
            loadingResource: null,
          })
          return
        }
        const result = invalidSession(error)
        if (result === VALID_SESSION) {
          onError(error)
          dispatchToggleLoader(dispatch, false, {
            method,
            url,
            loadingResource: null,
          })
          return
        }
        dispatchToggleLoader(dispatch, false, {
          method,
          url,
          loadingResource: null,
        })
        dispatch(result)
      })
  }
  if (method === "PATCH") {
    axios
      .patch(url, payload)
      .then(function(response) {
        onSuccess(response)
        dispatchToggleLoader(dispatch, false, {
          method,
          url,
          loadingResource: null,
        })
      })
      .catch(function(error) {
        if (process.env.NODE_ENV === "development") {
          console.log("the error in PATCH")
          console.log(error)
        }
        if (
          error.hasOwnProperty("message") &&
          error.message === "Network Error"
        ) {
          onError({
            response: {
              data: { message: "An error occured with the network." },
            },
          })
          dispatchToggleLoader(dispatch, false, {
            method,
            url,
            loadingResource: null,
          })
          return
        }
        const result = invalidSession(error)
        if (result === VALID_SESSION) {
          onError(error)
          dispatchToggleLoader(dispatch, false, {
            method,
            url,
            loadingResource: null,
          })
          return
        }
        dispatchToggleLoader(dispatch, false, {
          method,
          url,
          loadingResource: null,
        })
        dispatch(result)
      })
  }
  if (method === "DELETE") {
    axios
      .delete(url)
      .then(function(response) {
        onSuccess(response)
        dispatchToggleLoader(dispatch, false, {
          method,
          url,
          loadingResource: null,
        })
      })
      .catch(function(error) {
        if (process.env.NODE_ENV === "development") {
          console.log("the error in DELETE")
          console.log(error)
        }
        if (
          error.hasOwnProperty("message") &&
          error.message === "Network Error"
        ) {
          onError({
            response: {
              data: { message: "An error occured with the network." },
            },
          })
          dispatchToggleLoader(dispatch, false, {
            method,
            url,
            loadingResource: null,
          })
          return
        }
        const result = invalidSession(error)
        if (result === VALID_SESSION) {
          onError(error)
          dispatchToggleLoader(dispatch, false, {
            method,
            url,
            loadingResource: null,
          })
          return
        }
        dispatchToggleLoader(dispatch, false, {
          method,
          url,
          loadingResource: null,
        })
        dispatch(result)
      })
  }
}

export const apiMiddleware = ({ dispatch }) => next => action => {
  if (process.env.NODE_ENV === "development")
    console.log("Inside the middleware w/ action: ", action)
  if (action.type === API_REQUEST) {
    if (process.env.NODE_ENV === "development")
      console.log("action.type === API_REQUEST")
    return makeRequest(dispatch, action, action.meta)
  }
  if (process.env.NODE_ENV === "development")
    console.log("calling next(action) in middleware")
  next(action)
}
