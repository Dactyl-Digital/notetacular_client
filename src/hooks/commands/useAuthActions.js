import { useDispatch } from "react-redux"
import { apiRequest } from "../../store/actions/api"
import { loginUser, setSignupError } from "../../store/actions/auth"
import { SIGNUP_URL, LOGIN_URL } from "../../APIEndpoints"

// NOTE:
// Had to break out the action dispatcher helper functions from outside of useAuthActions
// so they may be used when testing the mocked store.
// Otherwise this error is received when testing the mocked store and attempting
// to invoke the signupUser yields this error:
// Invariant Violation: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
//     1. You might have mismatching versions of React and the renderer (such as React DOM)
//     2. You might be breaking the Rules of Hooks
//     3. You might have more than one copy of React in the same app
//     See https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.
export const signupUser = dispatch => signupData => {
  console.log("signupData: ", signupData)
  dispatch(
    apiRequest({
      method: "POST",
      url: SIGNUP_URL,
      payload: signupData,
      onSuccess: signupSuccess(dispatch),
      onError: signupError(dispatch),
    })
  )
}

export const signupSuccess = dispatch => ({ username }) => {
  console.log("the User in signupSuccess: ", username)
  dispatch(setUser({ username }))
}

const signupError = dispatch => ({ error }) => {
  console.log("inside signupError", error)
  dispatch(setSignupError({ error }))
}

export function useAuthActions() {
  const dispatch = useDispatch()

  return {
    signupUser: signupUser(dispatch),
  }
}
