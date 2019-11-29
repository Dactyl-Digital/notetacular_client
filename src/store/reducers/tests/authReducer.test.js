import authReducer, { authInitialState } from "../authReducer"
import {
  setLoginUser,
  setLogoutUser,
  setSuccessfulSignup,
  setSignupError,
  setLoginError,
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

  it("should set authenticated true on setLoginUser", () => {
    expect(authReducer(undefined, setLoginUser())).toEqual(signedInState)
  })

  it("should set authenticated false on setLogoutUser", () => {
    expect(authReducer(signedInState, setLogoutUser())).toEqual({
      ...signedInState,
      authenticated: false,
    })
  })

  it("should set signupError to errors received from unsuccessful signup on setSignupError", () => {
    expect(authReducer(undefined, setSignupError(signupErrorResponse))).toEqual(
      { ...authInitialState, signupError: signupErrorResponse.response.data }
    )
  })
})
