import notebookReducer, { notebookInitialState } from "../notebookReducer"
import {
  setCreatedNotebook,
  setCreateNotebookError,
} from "../../actions/notebook"
import { signupErrorResponse } from "../../../test_fixture_data"

const signedInState = {
  authenticated: true,
  successfulSignup: false,
  signupError: null,
  signinError: null,
}

describe("notebookReducer", () => {
  it("should return the initial state", () => {
    expect(notebookReducer(undefined, { data: {} })).toEqual(
      notebookInitialState
    )
  })

  // it("should set a new notebook to true on setSuccessfulSignup", () => {
  //   expect(notebookReducer(undefined, setSuccessfulSignup())).toEqual({
  //     ...notebookInitialState,
  //     successfulSignup: true,
  //   })
  // })

  // it("should set notebookenticated true on loginUser", () => {
  //   expect(notebookReducer(undefined, loginUser())).toEqual(signedInState)
  // })

  // it("should set notebookenticated false on logoutUser", () => {
  //   expect(notebookReducer(signedInState, logoutUser())).toEqual({
  //     ...signedInState,
  //     notebook: false,
  //   })
  // })

  // it("should set signupError to errors received from unsuccessful signup", () => {
  //   expect(
  //     notebookReducer(undefined, setSignupError(signupErrorResponse))
  //   ).toEqual({ ...notebookInitialState, signupError: signupErrorResponse })
  // })
})
