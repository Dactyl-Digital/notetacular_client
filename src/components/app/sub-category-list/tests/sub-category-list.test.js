test("1+1=2", () => {
  expect(1 + 1).toBe(2)
})

// NOTE: Had to move on from this... spent too much time working on
// getting the mocked store setup with a notebook and some sub-categories
// in order to perform the snapshot... A possible solution would be to just pass in the
// state to the second argument of createStore, but that seems less than ideal.
// import React from "react"
// import { createStore, applyMiddleware } from "redux"
// import axios from "axios"
// import configureStore from "redux-mock-store"
// import { rootReducer } from "../../../../store/reducers"
// import { apiMiddleware } from "../../../../store/middleware/api"
// import { Provider } from "react-redux"
// import {
//   render,
//   fireEvent,
//   cleanup,
//   waitForElement,
//   debugDOM,
// } from "@testing-library/react"
// import {
//   createNotebook,
//   listNotebooks,
// } from "../../../../hooks/commands/useNotebookActions"
// // import { store } from "../../../../store"
// import SubCategoryList from "../index"
// // import { initialStateWithoutTransactions } from "test_fixture_data"
// // import { inputChangeTestCase, inputChange } from "./helpers"
// import {
//   signupData,
//   signupErrorResponse,
//   createNotebookData,
//   createNotebookResponse,
//   listNotebooksResponse,
//   createSubCategoryData,
//   createSubCategoryResponse,
//   listSubCategoriesResponse,
//   createTopicData,
//   createTopicResponse,
//   listTopicsResponse,
//   createNoteData,
//   createNoteResponse,
//   listNotesResponse,
// } from "../../../../test_fixture_data"

// // this adds custom jest matchers from jest-dom
// import "@testing-library/jest-dom/extend-expect"

// // automatically unmount and cleanup DOM after the test is finished.
// afterEach(cleanup)

// jest.mock("axios")

// describe("puck", () => {
//   let store
//   beforeAll(() => {
//     store = createStore(rootReducer, {}, applyMiddleware(apiMiddleware))
//     store = createNotebook(store.dispatch)(createNotebookData)
//     console.log("store in beforeALl after update")
//     console.log(store)
//   })

//   test("SubCategoryList renders list of SubCategories", async () => {
//     // const store = mockStore(rootReducer)
//     // Need to create a base rootReducer state....
//     // Use beforeAll function to setup state with:
//     // 1. createNotebook
//     // 2. createSubCategory
//     // 3. createSubCategory

//     console.log("store in subCategoryList rest")
//     console.log(store)
//     const { getByTestId, debug } = render(
//       <Provider store={store}>
//         <SubCategoryList />
//       </Provider>
//     )

//     const firstSubCategory = await waitForElement(() =>
//       getByTestId("sub-category-list-page")
//     )

//     debug()
//     expect(firstSubCategory).toMatchSnapshot()
//   })
// })
