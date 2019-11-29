import {
  SET_CREATED_NOTE,
  SET_NOTE_LIST,
  LIST_SHARED_NOTES,
  SET_CREATE_NOTE_ERROR,
  SET_NOTE_LIST_ERROR,
  SET_LIST_SHARED_NOTE_ERROR,
} from "../actions/note"
// import {helperFunction} from '../helpers'

export const noteInitialState = {
  listNotesOffset: 0,
  notes: {},
  listSharedNotesOffset: 0,
  sharedNotes: {},
  createNoteError: null,
  noteListError: null,
  listSharedNotesError: null,
}

const normalizeSingle = ({ data }) => ({
  [data.id]: {
    ...data,
  },
})

// TODO: Move this into a helper folder.
const normalize = key => ({ data }) =>
  data[key].reduce((acc, resource) => {
    acc[resource.id] = resource
    return acc
  }, {})

const normalizeNotes = normalize("notes")

export default function noteReducer(
  noteState = noteInitialState,
  { type, payload }
) {
  if (type === SET_CREATED_NOTE) {
    return {
      ...noteState,
      notes: {
        ...noteState.notes,
        ...normalizeSingle(payload),
      },
    }
  }
  if (type === SET_NOTE_LIST) {
    return noteListNewState(noteState, payload)
  }
  // if (type === LIST_SHARED_SUB_CATEGORIES) {
  //   return { ...noteState, successfulSignup: true }
  // }
  if (type === SET_CREATE_NOTE_ERROR) {
    return { ...noteState, createNoteError: payload }
  }
  if (type === SET_NOTE_LIST_ERROR) {
    return { ...noteState, noteListError: payload }
  }
  // if (type === SET_LIST_SHARED_noteS_ERROR) {
  //   return { ...noteState, signinError: payload.errors }
  // }
  return noteState
}

const noteListNewState = (noteState, payload) => ({
  ...noteState,
  notes: {
    ...noteState.notes,
    ...normalizeNotes(payload),
  },
  listNotesOffset: noteState.listNotesOffset + 20,
})
