// REMEMBER: the jest.mock/1 call inside of a test file must
// pass in an argument of a string that matches the name of the
// mocked file for that module. i.e. jest.mock("axios")
// If this file was named get_account_axios.js, then jest would never detect this
// mocked file.
import {
  signupSuccessResponse,
  signupErrorResponse,
  createNotebookResponse,
  listNotebooksResponse,
} from "../../../test_fixture_data"

const mockAxios = {
  create: () => mockAxios,
  get: (url, params) => {
    if (url === "http://localhost:4000/api/notebook?limit=20&offset=0") {
      return Promise.resolve(listNotebooksResponse)
    }
  },
  post: (url, params) => {
    console.log("params in mock axios: ", params)
    if (params.fail) {
      return Promise.reject(signupErrorResponse)
    }
    if (params.expireSession) {
      return Promise.reject({
        response: {
          data: {
            message: "Invalid session",
          },
        },
      })
    }
    if (url === "http://localhost:4000/api/signup") {
      return Promise.resolve(signupSuccessResponse)
    }
    if (url === "http://localhost:4000/api/notebook") {
      return Promise.resolve(createNotebookResponse)
    }
  },
  noPost: url => {
    return Promise.resolve({ data: { message: "Should never see this." } })
  },
}

// This is what is called a manual mock
// Documentation -> https://jestjs.io/docs/en/manual-mocks
module.exports = mockAxios
