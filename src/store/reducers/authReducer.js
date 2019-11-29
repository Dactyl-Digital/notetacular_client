import {
  LOGIN_USER,
  LOGOUT_USER,
  SIGN_UP_SUCCESS,
  SET_SIGNUP_ERROR,
  SET_LOGIN_ERROR,
} from "../actions/auth"
// import {helperFunction} from '../helpers'

const authenticated = localStorage.getItem("authenticated")

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
