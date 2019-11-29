import { createStore, applyMiddleware, compose } from "redux"
import { apiMiddleware } from "./middleware/api"
import { rootReducer } from "./reducers"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(apiMiddleware))
)

const manageAuthenticatedStatus = (lsAuthenticated, currentAuthenticated) => {
  // Previous auth session not saved in localStorage, but user is currently authenticated... so persist it.
  if (!lsAuthenticated && currentAuthenticated) {
    return localStorage.setItem("authenticated", currentAuthenticated)
  }
  // User has logged out. previous auth session saved in localStorage, and redux store
  // authenticated state has transitioned from true to false. So clear the localStorage
  if (!currentAuthenticated && lsAuthenticated) {
    return localStorage.removeItem("authenticated")
  }
  // FINAL CASE:
  // User not authenticated, but previous auth session was saved in localStorage, so restore it.
  // This case is handled in authReducer.
}

let currentAuthenticated
const handleChange = () => {
  let previousAuthenticated = currentAuthenticated
  const {
    auth: { authenticated: currentAuthenticated },
  } = store.getState()
  const lsAuthenticated = localStorage.getItem("authenticated")
  if (previousAuthenticated !== currentAuthenticated) {
    manageAuthenticatedStatus(lsAuthenticated, currentAuthenticated)
  }
}

store.subscribe(handleChange)
