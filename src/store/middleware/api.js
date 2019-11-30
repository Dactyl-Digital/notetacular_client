import axios from "axios"
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
      .post(url, payload)
      .then(function(response) {
        // dispatchToggleLoader(dispatch, false, { method, url })
        console.log("the response in POST")
        console.log(response)
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
        console.log(error)
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
        onError(error)
      })
  }
  if (method === "GET") {
    axios({
      method: "get",
      url: url,
      params: payload,
    })
      .then(function(response) {
        console.log("the response in GET")
        console.log(response)
        // dispatchToggleLoader(dispatch, false, { method, url })
        onSuccess(response)
      })
      .catch(function(error) {
        console.log("the error in GET")
        console.log(error)
        onError(error)
      })
  }

  // if (method === "GET") {
  //   // dispatchToggleLoader(dispatch, true, { method, url })
  //   return axios
  //     .get(url)
  //     .then(function(response) {
  //       console.log("the response in GET")
  //       console.log(response)
  //       // dispatchToggleLoader(dispatch, false, { method, url })
  //       onSuccess(response)
  //     })
  //     .catch(function(error) {
  //       console.log("the error in GET")
  //       console.log(error)
  //       onError(error)
  //     })
  // }
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
