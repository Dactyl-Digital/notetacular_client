import { LOGIN_USER } from "../actions/auth"
// import {helperFunction} from '../helpers'

const initialState = {
  authenticated: false,
  signupUserError: null,
  signinUserError: null,
}

export default function authReducer(
  authState = initialState,
  { type, payload }
) {
  if (type === LOGIN_USER) {
    return { ...authState, authenticated: true }
  }
  return authState
}
