export const LOGIN_USER = "LOGIN_USER"
export const SET_SIGNUP_ERROR = "SET_SIGNUP_ERROR"

// NOTE:
// success response when hitting /api/signup
// {
//   "username": "testuser8",
//   "message": "You've successfully signed up!"
// }
// Expected to be passed in as the object argument to setUser

export const loginUser = () => ({
  type: LOGIN_USER,
  payload: {},
  meta: {
    trigger:
      "User signup or signin was successful and currentUser is being set.",
  },
})

export const setSignupError = error => {
  console.log("the console.log of signup error: ")
  console.log(error)
  console.log("the console.dir of signup error: ")
  console.dir(error)
}
