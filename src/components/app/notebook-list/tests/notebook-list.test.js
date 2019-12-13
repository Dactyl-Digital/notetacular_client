import React from "react"
import { createStore, applyMiddleware } from "redux"
import axios from "axios"
import configureStore from "redux-mock-store"
import { rootReducer } from "../../../../store/reducers"
import { apiMiddleware } from "../../../../store/middleware/api"
import { Provider } from "react-redux"
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  debugDOM,
} from "@testing-library/react"
// import { store } from "../../../../store"
import NotebookList from "../index"
// import { initialStateWithoutTransactions } from "test_fixture_data"
// import { inputChangeTestCase, inputChange } from "./helpers"

// this adds custom jest matchers from jest-dom
import "@testing-library/jest-dom/extend-expect"

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

jest.mock("axios")

test("NotebookList renders list of notebooks", async () => {
  // const store = mockStore(rootReducer)
  const store = createStore(rootReducer, {}, applyMiddleware(apiMiddleware))
  const { getByTestId, debug } = render(
    <Provider store={store}>
      <NotebookList />
    </Provider>
  )

  const firstNotebook = await waitForElement(() =>
    getByTestId("notebook-list-page")
  )
  debug()
  expect(firstNotebook).toMatchSnapshot()
})

// test("BudgetDisplay renders with retrieved data from budget app API.", async done => {
//   const { getByTestId, debug } = render(
//     <BudgetReducerProvider
//       reducer={{ state: initialStateWithoutTransactions, dispatch: () => true }}
//     >
//       <BudgetDisplay budgetData={initialStateWithoutTransactions.data} />
//     </BudgetReducerProvider>
//   )
//   // debug()
//   const accountBalance = await waitForElement(() =>
//     getByTestId("account-balance")
//   )
//   const currentBudget = await waitForElement(() =>
//     getByTestId("current-budget")
//   )
//   const budgetExceeded = await waitForElement(() =>
//     getByTestId("budget-exceeded")
//   )
//   expect(accountBalance).toHaveTextContent("0")
//   expect(currentBudget).toHaveTextContent("Set Budget")
//   expect(budgetExceeded).toHaveTextContent("You're Good")
//   done()
// })
