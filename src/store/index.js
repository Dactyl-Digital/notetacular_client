import { createStore, applyMiddleware, compose } from "redux"
import { apiMiddleware } from "./middleware/api"
import { rootReducer } from "./reducers"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(apiMiddleware))
)
