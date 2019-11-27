import { combineReducers } from "redux"
// import uiReducer from "./uiReducer";
import authReducer from "./authReducer"
import notebookReducer from "./notebookReducer"
// import modalReducer from "./modalReducer"

export const rootReducer = combineReducers({
  // ui: uiReducer,
  auth: authReducer,
  notebook: notebookReducer,
  // modal: modalReducer,
})
