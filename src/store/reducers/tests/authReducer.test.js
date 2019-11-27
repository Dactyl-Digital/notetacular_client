import authReducer, { authInitialState } from "../authReducer"
import {
  loginUser,
  logoutUser,
  setSuccessfulSignup,
  setSignupError,
  setSigninError,
} from "../../actions/auth"
import { signupErrorResponse } from "../../../test_fixture_data"

const signedInState = {
  authenticated: true,
  successfulSignup: false,
  signupError: null,
  signinError: null,
}

describe("authReducer", () => {
  it("should return the initial state", () => {
    expect(authReducer(undefined, {})).toEqual(authInitialState)
  })

  it("should set successfulSignup to true on setSuccessfulSignup", () => {
    expect(authReducer(undefined, setSuccessfulSignup())).toEqual({
      ...authInitialState,
      successfulSignup: true,
    })
  })

  it("should set authenticated true on loginUser", () => {
    expect(authReducer(undefined, loginUser())).toEqual(signedInState)
  })

  it("should set authenticated false on logoutUser", () => {
    expect(authReducer(signedInState, logoutUser())).toEqual({
      ...signedInState,
      authenticated: false,
    })
  })

  it("should set signupError to errors received from unsuccessful signup", () => {
    expect(authReducer(undefined, setSignupError(signupErrorResponse))).toEqual(
      { ...authInitialState, signupError: signupErrorResponse.response.data }
    )
  })
})
