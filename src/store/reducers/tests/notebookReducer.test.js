import notebookReducer, { notebookInitialState } from "../notebookReducer"
import {
  setCreatedNotebook,
  setCreateNotebookError,
  setNotebookList,
} from "../../actions/notebook"
import {
  createNotebookResponse,
  listNotebooksResponse,
  normalizedNotebookList,
} from "../../../test_fixture_data"

describe("notebookReducer", () => {
  it("should return the initial state", () => {
    expect(notebookReducer(undefined, { data: {} })).toEqual(
      notebookInitialState
    )
  })

  it("setNotebookList should set a normalized list of notebooks to the notebookState and increments the corresponding offset by 20", () => {
    expect(
      notebookReducer(undefined, setNotebookList(listNotebooksResponse))
    ).toEqual({
      listNotebooksOffset: 20,
      // NOTE: Strangeness... Test would fail if I replace the below with normalizedNotebookList imported from test_fixture_data.
      notebooks: {
        "1": { id: 1, title: "Notebook1" },
        "2": { id: 2, title: "Notebook2" },
      },
      listSharedNotebooksOffset: 0,
      sharedNotebooks: {},
      createNotebookError: null,
      notebookListError: null,
      listSharedNotebooksError: null,
    })
  })

  it("setCreatedNotebook should append a newly created notebook to the normalized notebooks", () => {
    const stateWithNotebooks = notebookReducer(
      undefined,
      setNotebookList(listNotebooksResponse)
    )
    expect(
      notebookReducer(
        stateWithNotebooks,
        setCreatedNotebook(createNotebookResponse)
      )
    ).toEqual({
      listNotebooksOffset: 20,
      // NOTE: Strangeness... Test would fail if I replace the below with normalizedNotebookList imported from test_fixture_data.
      notebooks: {
        "1": { id: 1, title: "Notebook1" },
        "2": { id: 2, title: "Notebook2" },
        "3": { id: 3, title: "Notebook3" },
      },
      listSharedNotebooksOffset: 0,
      sharedNotebooks: {},
      createNotebookError: null,
      notebookListError: null,
      listSharedNotebooksError: null,
    })
  })

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
