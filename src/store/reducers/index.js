import { combineReducers } from "redux"
// import uiReducer from "./uiReducer";
import authReducer from "./authReducer"
import notebookReducer from "./notebookReducer"
import subCategoryReducer from "./subCategoryReducer"
import topicReducer from "./topicReducer"
import noteReducer from "./noteReducer"
import noteTimerReducer from "./noteTimerReducer"
// import modalReducer from "./modalReducer"

export const rootReducer = combineReducers({
  // ui: uiReducer,
  auth: authReducer,
  notebook: notebookReducer,
  subCategory: subCategoryReducer,
  topic: topicReducer,
  note: noteReducer,
  noteTimer: noteTimerReducer,
  // modal: modalReducer,
})
