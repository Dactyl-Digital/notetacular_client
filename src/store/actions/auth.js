export const LOGIN_USER = "LOGIN_USER"
export const LOGOUT_USER = "LOGOUT_USER"
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS"
export const SET_SIGNUP_ERROR = "SET_SIGNUP_ERROR"
export const SET_SIGNIN_ERROR = "SET_SIGNIN_ERROR"

export const loginUser = () => ({
  type: LOGIN_USER,
  payload: {},
  meta: {
    trigger: "User login was successful and authenticated will be set to true.",
  },
})

export const logoutUser = () => ({
  type: LOGOUT_USER,
  payload: {},
  meta: {
    trigger:
      "User logout was successful and authenticated will be set to false.",
  },
})

export const setSuccessfulSignup = () => ({
  type: SIGN_UP_SUCCESS,
  payload: {},
  meta: {
    trigger: "User signed up and must be prompted to verify email.",
  },
})

export const setSignupError = ({ response }) => {
  console.log("WHAT IS RESPONSE?!?!")
  console.log(response)
  return {
    type: SET_SIGNUP_ERROR,
    payload: response.data,
    meta: {
      trigger:
        "User entered credentials which are already taken or server error.",
    },
  }
}

export const setSigninError = ({ response }) => {
  return {
    type: SET_SIGNIN_ERROR,
    payload: response.data,
    meta: {
      trigger: "User entered incorrect username or password or server error.",
    },
  }
}
