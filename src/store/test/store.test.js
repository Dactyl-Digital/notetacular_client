import axios from "axios"
import configureStore from "redux-mock-store"
import { rootReducer } from "../reducers"
import { apiMiddleware } from "../middleware/api"
import { setSuccessfulSignup, setSignupError } from "../actions/auth"
import { setCreatedNotebook, setNotebookList } from "../actions/notebook"
import {
  setCreatedSubCategory,
  setSubCategoryList,
} from "../actions/subCategory"
import { setCreatedTopic, setTopicList } from "../actions/topic"
import { setCreatedNote, setNoteList } from "../actions/note"
import { signupUser } from "../../hooks/commands/useAuthActions"
import {
  createNotebook,
  listNotebooks,
} from "../../hooks/commands/useNotebookActions"
import {
  createSubCategory,
  listSubCategories,
} from "../../hooks/commands/useSubCategoryActions"
import { createTopic, listTopics } from "../../hooks/commands/useTopicActions"
import { createNote, listNotes } from "../../hooks/commands/useNoteActions"
import {
  signupData,
  signupErrorResponse,
  createNotebookData,
  createNotebookResponse,
  listNotebooksResponse,
  createSubCategoryData,
  createSubCategoryResponse,
  listSubCategoriesResponse,
  createTopicData,
  createTopicResponse,
  listTopicsResponse,
  createNoteData,
  createNoteResponse,
  listNotesResponse,
} from "../../test_fixture_data"

const middlewares = [apiMiddleware]
const mockStore = configureStore(middlewares)

// import { render } from "react-testing-library";

// this adds custom jest matchers from jest-dom
// import "jest-dom/extend-expect";

// automatically unmount and cleanup DOM after the test is finished.
// afterEach(cleanup);

jest.mock("axios")

// TODO: Should probably break this test file up to live within
//       the hooks folder for each respective useAuthActions, useNotebookActions, etc.
// useAuthActions Hook Commands
test("Store receives SIGN_UP_SUCCESS action type when POST /api/signup is a success", done => {
  const store = mockStore(rootReducer)
  // This dispatched action fires off an API request via axios from within the middleware
  // and the onSuccess callback (setSuccessfulSignup) is invoked with the success response.
  signupUser(store.dispatch)(signupData)
  setTimeout(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual(setSuccessfulSignup())
    done()
  }, 0)
})

test("Store receives SET_SIGNUP_ERROR action type when POST /api/signup responds with error", done => {
  const store = mockStore(rootReducer)
  // This dispatched action fires off an API request via axios from within the middleware
  // and the onError callback (setSignupError) is invoked with the error response.
  signupUser(store.dispatch)({ ...signupData, fail: true })
  setTimeout(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual(setSignupError(signupErrorResponse))
    done()
  }, 0)
})

// test("Store receives LOGOUT_USER action type when session is expired", done => {
//   const store = mockStore(rootReducer)
//   signupPizzaChef(store.dispatch)({ signupParams, expireSession: true })
//   setTimeout(() => {
//     const actions = store.getActions()
//     expect(actions[0]).toEqual(loaderTrueAction)
//     expect(actions[1]).toEqual(loaderFalseAction)
//     expect(actions[2]).toEqual(logoutUserAction)
//     done()
//   }, 0)
// })

// useNotebookActions Hook Commands
test("Store receives SET_CREATED_NOTEBOOK action type when POST /api/notebook is a success", done => {
  const store = mockStore(rootReducer)
  createNotebook(store.dispatch)(createNotebookData)
  setTimeout(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual(setCreatedNotebook(createNotebookResponse))
    done()
  }, 0)
})

// test("Store receives SET_CREATED_NOTEBOOK action type when POST /api/notebook is a success", done => {
//   const store = mockStore(rootReducer)
//   createNotebook(store.dispatch)(createNotebookData)
//   setTimeout(() => {
//     const actions = store.getActions()
// console.log("set created notebook actions[0]")
// console.log(actions[0])
// console.log("setCreatedNotebook(createNotebookResponse)")
// console.log(setCreatedNotebook(createNotebookResponse))
//     expect(actions[0]).toEqual(setCreatedNotebook({data: createNotebookResponse}))
//     done()
//   }, 0)
// })

test("Store receives SET_NOTEBOOK_LIST action type when GET /api/notebook is a success", done => {
  const store = mockStore(rootReducer)
  listNotebooks(store.dispatch)(0)
  setTimeout(() => {
    const actions = store.getActions()
    // console.log("SET_NOTEBOOK_LIST actions[0]")
    // console.log(actions[0])
    // console.log("setCreatedNotebook(createNotebookResponse)")
    // console.log(setNotebookList(listNotebooksResponse))
    expect(actions[0]).toEqual(setNotebookList(listNotebooksResponse))
    done()
  }, 0)
})

// useSubCategoryActions Hook Commands
test("Store receives SET_CREATED_SUB_CATEGORY action type when POST /api/sub-category is a success", done => {
  const store = mockStore(rootReducer)
  createSubCategory(store.dispatch)(createSubCategoryData)
  setTimeout(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual(setCreatedSubCategory(createSubCategoryResponse))
    done()
  }, 0)
})

test("Store receives SET_SUB_CATEGORY_LIST action type when GET /api/sub-category is a success", done => {
  const store = mockStore(rootReducer)
  listSubCategories(store.dispatch)({
    offset: 0,
    sub_categories_id_list: [1, 2],
  })
  setTimeout(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual(setSubCategoryList(listSubCategoriesResponse))
    done()
  }, 0)
})

// useTopicActions Hook Commands
test("Store receives SET_CREATED_SUB_CATEGORY action type when POST /api/topic is a success", done => {
  const store = mockStore(rootReducer)
  createTopic(store.dispatch)(createTopicData)
  setTimeout(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual(setCreatedTopic(createTopicResponse))
    done()
  }, 0)
})

test("Store receives SET_TOPIC_LIST action type when GET /api/topic is a success", done => {
  const store = mockStore(rootReducer)
  listTopics(store.dispatch)({
    offset: 0,
    topic_id_list: [1, 2],
  })
  setTimeout(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual(setTopicList(listTopicsResponse))
    done()
  }, 0)
})

// useNoteActions Hook Commands
test("Store receives SET_CREATED_NOT action type when POST /api/note is a success", done => {
  const store = mockStore(rootReducer)
  createNote(store.dispatch)(createNoteData)
  setTimeout(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual(setCreatedNote(createNoteResponse))
    done()
  }, 0)
})

test("Store receives SET_NOTE_LIST action type when GET /api/note is a success", done => {
  const store = mockStore(rootReducer)
  listNotes(store.dispatch)({
    offset: 0,
    note_id_list: [1, 2],
  })
  setTimeout(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual(setNoteList(listNotesResponse))
    done()
  }, 0)
})
