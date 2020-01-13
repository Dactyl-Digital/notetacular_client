import {
  SET_CREATED_NOTE,
  SET_NOTE_LIST,
  LIST_SHARED_NOTES,
  REMOVE_DELETED_NOTE,
  SET_DELETE_NOTE_ERROR,
  SET_ADD_NOTE_TAGS,
  SET_CREATE_NOTE_ERROR,
  SET_NOTE_LIST_ERROR,
  SET_LIST_SHARED_NOTE_ERROR,
  SET_UPDATE_NOTE_CONTENT,
  SET_UPDATE_NOTE_CONTENT_ERROR,
  SET_REMOVED_NOTE_TAG,
} from "../actions/note"
import { checkProperty } from "./helpers"

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
//     notesPaginationEnd: true
//   },
// },

export const noteInitialState = {
  parentTopicsOfNotes: {},
  listSharedNotesOffset: 0,
  sharedNotes: {},
  createNoteError: null,
  noteListError: null,
  listSharedNotesError: null,
  deleteNoteError: null,
  updateNoteContentError: null,
}

// NOTE: On the next day.... Saving the old versions so the before and after can be displayed...
// const spreadPrevNotesIfNotNull = (obj, data) => {
//   const result =
//     obj.hasOwnProperty(data.topic_id) &&
//     obj.hasOwnProperty("notes") &&
//     obj.notes !== null
//       ? { ...obj[data.topic_id].notes, [data.id]: data }
//       : { [data.id]: data }
// }

// const normalizeSingle = (noteState, { data }) => ({
//   [data.topic_id]: {
//     notes: {
//       ...spreadPrevNotesIfNotNull(noteState.parentTopicsOfNotes, data),
//       // [data.id]: data,
//     },
//     listOffset: noteState.parentTopicsOfNotes.hasOwnProperty(data.topic_id)
//       ? noteState.parentTopicsOfNotes[data.topic_id].listOffset + 1
//       : 1,
//   },
// })

// This is necessary for when there are no other notes which have already been
// created under a particular topic.... Otherwise it'll error out.
// NOTE: This is the refactored version of spreadPrevNotesIfNotNull & old normalizeSingle
const normalizeSingle = ({ parentTopicsOfNotes }, { data }) => {
  const topic_id = data.topic_id
  const newNotes = checkProperty({
    obj: parentTopicsOfNotes,
    property: topic_id,
    failFn: () => ({
      [data.id]: data,
    }),
    recursiveFn: obj =>
      checkProperty({
        obj,
        property: "notes",
        successFn: () => ({
          ...obj["notes"],
          [data.id]: data,
        }),
        failFn: () => ({
          [data.id]: data,
        }),
      }),
  })
  const newListOffset = checkProperty({
    obj: parentTopicsOfNotes,
    property: topic_id,
    successFn: () => parentTopicsOfNotes[topic_id].listOffset + 1,
    failFn: () => 1,
  })
  return {
    [topic_id]: {
      notesPaginationEnd: true,
      notes: {
        ...newNotes,
      },
      listOffset: newListOffset,
    },
  }
}

// If I was to genericize this...
// I think I would use some kind of recursion/reduce over the keys of an
// object that I pass into a function to indicate the hierarchy which needs
// to be spread in the new object to be created.
// Not terrible proud of this.... but this could be a possible future implementation...
// ({
//   1: {
//     obj: acc,
//     key: resource.topic_id,
//   },
//   2: {
//     obj: acc[resource.topic_id],
//     key: "notes",
//     addNewValues: {
//       1: {
//         key: resource.id,
//         value: resource,
//       },
//       2: {
//         key: "listOffset",
//         value: noteState.parentTopicsOfNotes[resource.topic_id].listOffset,
//         incrementOnceBy: data[key].length,
//       },
//     },
//   },
// })

const normalize = key => (noteState, { data }) =>
  data[key].reduce((acc, resource, i) => {
    const notesPaginationEnd = data[key].length !== 20
    if (i === 0) {
      // NOTE: Doing this to ensure that listOffset is only incremented once while
      // iterating through the list of notes retrieved from the API.
      if (noteState.parentTopicsOfNotes.hasOwnProperty(resource.topic_id)) {
        // Updating a current topic's notes
        acc = {
          ...acc,
          [resource.topic_id]: {
            ...noteState.parentTopicsOfNotes[resource.topic_id],
            notesPaginationEnd,
            notes: {
              ...noteState.parentTopicsOfNotes[resource.topic_id].notes,
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
          notesPaginationEnd,
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
          notesPaginationEnd,
          notes: {
            ...acc[resource.topic_id].notes,
            [resource.id]: resource,
          },
        },
      }
    }
    return acc
  }, {})

const normalizeNotes = normalize("notes")

const normalizeSingleUpdate = ({ parentTopicsOfNotes }, { data }) => {
  const { topic_id } = data
  const updatedTopic = checkProperty({
    obj: parentTopicsOfNotes,
    property: topic_id,
    failFn: () => ({
      [data.id]: data,
    }),
    recursiveFn: obj =>
      checkProperty({
        obj,
        property: "notes",
        successFn: () => ({
          ...obj["notes"],
          [data.id]: {
            ...obj["notes"][data.id],
            tags: data.tags,
          },
        }),
        failFn: () => {
          console.log("if failFn executes, you fucked up.")
        },
      }),
  })
  return {
    [topic_id]: {
      notes: {
        ...updatedTopic,
      },
    },
  }
}

export default function noteReducer(
  noteState = noteInitialState,
  { type, payload }
) {
  if (type === SET_CREATED_NOTE) {
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
  if (type === REMOVE_DELETED_NOTE) {
    const { topic_id, note_id } = payload
    delete noteState.parentTopicsOfNotes[topic_id].notes[note_id]
    return {
      ...noteState,
      parentTopicsOfNotes: {
        ...noteState.parentTopicsOfNotes,
        [topic_id]: {
          ...noteState.parentTopicsOfNotes[topic_id],
          notes: {
            ...noteState.parentTopicsOfNotes[topic_id].notes,
          },
          listOffset: noteState.parentTopicsOfNotes[topic_id].listOffset - 1,
        },
      },
    }
  }
  if (type === SET_UPDATE_NOTE_CONTENT) {
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
  if (type === SET_ADD_NOTE_TAGS) {
    return {
      ...noteState,
      parentTopicsOfNotes: {
        ...noteState.parentTopicsOfNotes,
        ...normalizeSingleUpdate(noteState, payload),
      },
    }
  }
  if (type === SET_REMOVED_NOTE_TAG) {
    return {
      ...noteState,
      parentTopicsOfNotes: {
        ...noteState.parentTopicsOfNotes,
        ...normalizeSingleUpdate(noteState, payload),
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
  if (type === SET_DELETE_NOTE_ERROR) {
    return { ...noteState, deleteNoteError: payload }
  }
  if (type === SET_UPDATE_NOTE_CONTENT_ERROR) {
    return { ...noteState, updateNoteContentError: payload }
  }
  // SET_ADD_TOPIC_TAGS_ERROR
  // SET_REMOVE_TOPIC_TAG_ERROR
  // if (type === SET_LIST_SHARED_NOTES_ERROR) {
  //   return { ...noteState, signinError: payload.errors }
  // }
  return noteState
}

const noteListNewState = (noteState, payload) => {
  return {
    ...noteState,
    parentTopicsOfNotes: {
      ...noteState.parentTopicsOfNotes,
      ...normalizeNotes(noteState, payload),
    },
  }
}
