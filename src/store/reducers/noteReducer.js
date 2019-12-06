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

const normalizeSingle = (noteState, { data }) => ({
  [data.topic_id]: {
    ...noteState.notes[data.topic_id],
    [data.id]: data,
  },
})

// TODO: Move this into a helper folder.
const normalize = key => ({ data }) =>
  data[key].reduce((acc, resource) => {
    if (acc[resource.topic_id]) {
      // Updating a current topic's notes
      acc = {
        ...acc,
        [resource.topic_id]: {
          ...acc[resource.topic_id],
          [resource.id]: resource,
        },
      }
    } else {
      // Creating a new entry for a topic's notes
      acc[resource.topic_id] = {
        [resource.id]: resource,
      }
    }
    return acc
  }, {})

const normalizeNotes = normalize("notes")

export default function noteReducer(
  noteState = noteInitialState,
  { type, payload }
) {
  if (type === SET_CREATED_NOTE) {
    console.log("Da payload in create note is:")
    console.log(payload)
    return {
      ...noteState,
      notes: {
        ...noteState.notes,
        ...normalizeSingle(noteState, payload),
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
  // if (type === SET_LIST_SHARED_NOTES_ERROR) {
  //   return { ...noteState, signinError: payload.errors }
  // }
  return noteState
}

const noteListNewState = (noteState, payload) => {
  console.log("the payload in list new note state:")
  console.log(payload)
  return {
    ...noteState,
    notes: {
      ...noteState.notes,
      ...normalizeNotes(payload),
    },
    // NOTE: w/ the new state shape of:
    // {
    //   [topic1_id]: {
    //     [note1_id]: {},
    //     [note2_id]: {},
    //   },
    //   [topic2_id]: {
    //     [note3_id]: {},
    //     [note4_id]: {},
    //   },
    // }
    // You'll need to manage an offset for each individual topic's notes...
    // listNotesOffset: noteState.listNotesOffset + 20,
  }
}
