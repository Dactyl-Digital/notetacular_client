import { combineReducers } from "redux"
// import uiReducer from "./uiReducer";
import authReducer from "./authReducer"
// import modalReducer from "./modalReducer"

export const rootReducer = combineReducers({
  // ui: uiReducer,
  auth: authReducer,
  // modal: modalReducer,
})
