import {
  SET_CREATED_NOTE,
  SET_NOTE_LIST,
  LIST_SHARED_NOTES,
  SET_CREATE_NOTE_ERROR,
  SET_NOTE_LIST_ERROR,
  SET_LIST_SHARED_NOTE_ERROR,
  SET_UPDATE_NOTE_CONTENT,
  SET_UPDATE_NOTE_CONTENT_ERROR,
} from "../actions/note"
// import {helperFunction} from '../helpers'

// NOTE: This structure is meant to facilitate rendering the notes
// for each topic in the topicList view.
// parentTopicsOfNotes: {
//   "1": {
//     notes: {
//       "1": {
//         id: 1,
//         topic_id: 1,
//         title: "Note1",
//         note_timer_id_list: [1, 2],
//       },
//       "2": { id: 2, topic_id: 1, title: "Note2", note_timer_id_list: [] },
//       "3": { id: 3, topic_id: 1, title: "Note3", note_timer_id_list: [] },
//     },
//     listOffset: 20,
//   },
// },

export const noteInitialState = {
  parentTopicsOfNotes: {},
  listSharedNotesOffset: 0,
  sharedNotes: {},
  createNoteError: null,
  noteListError: null,
  listSharedNotesError: null,
  updateNoteContentError: null,
}

const normalizeSingle = (noteState, { data }) => ({
  [data.topic_id]: {
    notes: {
      ...noteState.parentTopicsOfNotes[data.topic_id].notes,
      [data.id]: data,
    },
    listOffset: noteState.parentTopicsOfNotes[data.topic_id].listOffset + 1,
  },
})

// TODO: Move this into a helper folder.
const normalize = key => (noteState, { data }) =>
  data[key].reduce((acc, resource, i) => {
    if (i === 0) {
      // NOTE: Doing this to ensure that listOffset is only incremented once while
      // iterating through the list of notes retrieved from the API.
      if (acc[resource.topic_id]) {
        // Updating a current topic's notes
        acc = {
          ...acc,
          [resource.topic_id]: {
            notes: {
              ...acc[resource.topic_id].notes,
              [resource.id]: resource,
            },
            listOffset:
              noteState.parentTopicsOfNotes[resource.topic_id].listOffset +
              data[key].length,
          },
        }
      } else {
        // Creating a new entry for a topic's notes
        acc[resource.topic_id] = {
          notes: {
            [resource.id]: resource,
          },
          listOffset: data[key].length,
        }
      }
    } else {
      // TODO: THIS ELSE LOGIC IS DUPLICATED (w/ one slight modification) ABOVE!
      // DO SOMETHING ABOUT THIS MESS
      // Updating a current topic's notes
      acc = {
        ...acc,
        [resource.topic_id]: {
          ...acc[resource.topic_id],
          notes: {
            ...acc[resource.topic_id].notes,
            [resource.id]: resource,
          },
        },
      }
    }
    // else {
    //   // Creating a new entry for a topic's notes
    //   acc[resource.topic_id] = {
    //     notes: {
    //       [resource.id]: resource,
    //     },
    //   }
    // }
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
      parentTopicsOfNotes: {
        ...noteState.parentTopicsOfNotes,
        ...normalizeSingle(noteState, payload),
      },
    }
  }
  if (type === SET_NOTE_LIST) {
    return noteListNewState(noteState, payload)
  }
  if (type === SET_UPDATE_NOTE_CONTENT) {
    console.log("Da payload in SET_UPDATE_NOTE_CONTENT:")
    console.log(payload)
    const {
      data: { data },
      topicId,
    } = payload
    return {
      ...noteState,
      parentTopicsOfNotes: {
        ...noteState.parentTopicsOfNotes,
        [topicId]: {
          ...noteState.parentTopicsOfNotes[topicId],
          notes: {
            ...noteState.parentTopicsOfNotes[topicId].notes,
            [data.note_id]: {
              ...noteState.parentTopicsOfNotes[topicId].notes[data.note_id],
              content_text: data.content_text,
              content_markdown: data.content_markdown,
            },
          },
        },
      },
    }
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
  if (type === SET_UPDATE_NOTE_CONTENT_ERROR) {
    return { ...noteState, updateNoteContentError: payload }
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
    parentTopicsOfNotes: {
      ...noteState.parentTopicsOfNotes,
      ...normalizeNotes(noteState, payload),
    },
  }
}
