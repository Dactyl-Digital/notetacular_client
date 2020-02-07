import {
  LOGIN_USER,
  LOGOUT_USER,
  INVALID_SESSION,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from "../actions/auth"
// import {helperFunction} from '../helpers'

let authenticated
if (typeof localStorage !== "undefined") {
  authenticated = localStorage.getItem("authenticated")
} else {
  authenticated = null
}

export const authInitialState = {
  authenticated: authenticated ? true : false,
  signupSuccess: false,
  signupError: null,
  loginSuccess: null,
  loginError: null,
}

export default function authReducer(
  authState = authInitialState,
  { type, payload }
) {
  if (type === LOGIN_USER) {
    return { ...authState, authenticated: true }
  }
  if (type === LOGOUT_USER) {
    return { ...authState, authenticated: false }
  }
  if (type === INVALID_SESSION) {
    return { ...authState, authenticated: false }
  }
  if (type === SIGNUP_SUCCESS) {
    return { ...authState, signupSuccess: true }
  }
  if (type === SIGNUP_ERROR) {
    return { ...authState, signupError: payload }
  }
  if (type === LOGIN_SUCCESS) {
    return { ...authState, loginSuccess: true }
  }
  if (type === LOGIN_ERROR) {
    return { ...authState, loginError: payload }
  }
  return authState
}
