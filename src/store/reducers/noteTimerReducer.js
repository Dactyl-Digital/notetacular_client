import {
  SET_CREATED_NOTE_TIMER,
  SET_UPDATED_NOTE_TIMER,
  SET_DELETED_NOTE_TIMER,
  SET_CREATE_NOTE_TIMER_ERROR,
  SET_UPDATE_NOTE_TIMER_ERROR,
  SET_DELETE_NOTE_TIMER_ERROR,
} from "../actions/note"
import { checkProperty } from "./helpers"

export const noteTimerInitialState = {
  parentNotesOfNoteTimers: {},
  listSharedNoteTimersOffset: 0,
  sharedNoteTimers: {},
  createNoteTimerError: null,
  noteTimerListError: null,
  listSharedNoteTimersError: null,
  updateNoteContentError: null,
}

export default function noteTimerReducer(
  noteTimerState = noteTimerInitialState,
  { type, payload }
) {
  if (type === SET_CREATED_NOTE_TIMER) {
    return {
      ...noteTimerState,
      // TODO
    }
  }
  if (type === SET_UPDATED_NOTE_TIMER) {
    return {
      ...noteTimerState,
      // TODO
    }
  }
  if (type === SET_DELETED_NOTE_TIMER) {
    return {
      ...noteTimerState,
      // TODO
    }
  }
  if (type === SET_CREATE_NOTE_TIMER_ERROR) {
    return { ...noteTimerState, createNoteTimerError: payload }
  }
  return noteTimerState
}
