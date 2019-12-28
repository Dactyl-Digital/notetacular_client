import {
  LOGIN_USER,
  LOGOUT_USER,
  INVALID_SESSION,
  SIGN_UP_SUCCESS,
  SET_SIGNUP_ERROR,
  SET_LOGIN_ERROR,
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
  successfulSignup: false,
  signupError: null,
  signinError: null,
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
  if (type === SIGN_UP_SUCCESS) {
    return { ...authState, successfulSignup: true }
  }
  if (type === SET_SIGNUP_ERROR) {
    return { ...authState, signupError: payload }
  }
  if (type === SET_LOGIN_ERROR) {
    return { ...authState, signinError: payload }
  }
  return authState
}
