export const LOGIN_USER = "LOGIN_USER"
export const LOGOUT_USER = "LOGOUT_USER"
export const INVALID_SESSION = "INVALID_SESSION"
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS"
export const SIGNUP_ERROR = "SIGNUP_ERROR"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_ERROR = "LOGIN_ERROR"
export const LOGOUT_ERROR = "LOGOUT_ERROR"

export const setLoginUser = () => ({
  type: LOGIN_USER,
  payload: {},
  meta: {
    trigger: `User login was successful and authenticated will be set to true.`,
  },
})

export const setLogoutUser = () => ({
  type: LOGOUT_USER,
  payload: {},
  meta: {
    trigger:
      "User logout was successful and authenticated will be set to false.",
  },
})

export const setSuccessfulSignup = () => ({
  type: SIGNUP_SUCCESS,
  payload: {},
  meta: {
    trigger: "User signed up and must be prompted to verify email.",
  },
})

export const setSignupError = ({ response }) => {
  return {
    type: SIGNUP_ERROR,
    payload: response.data,
    meta: {
      trigger:
        "User entered credentials which are already taken or server error.",
    },
  }
}

export const setLoginError = ({ response }) => {
  return {
    type: LOGIN_ERROR,
    payload: response.data,
    meta: {
      trigger: "User entered incorrect username or password or server error.",
    },
  }
}

export const setLogoutError = () => {
  return {
    type: LOGOUT_ERROR,
    payload: {},
    meta: {
      trigger: "User entered incorrect username or password or server error.",
    },
  }
}
