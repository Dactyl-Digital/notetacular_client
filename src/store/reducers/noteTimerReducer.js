import {
  SET_CREATED_NOTE_TIMER,
  SET_NOTE_TIMER_LIST,
  SET_UPDATED_NOTE_TIMER,
  SET_DELETED_NOTE_TIMER,
  SET_CREATE_NOTE_TIMER_ERROR,
  SET_UPDATE_NOTE_TIMER_ERROR,
  SET_DELETE_NOTE_TIMER_ERROR,
} from "../actions/note-timer"
import { checkProperty } from "./helpers"

export const noteTimerInitialState = {
  parentNotesOfNoteTimers: {},
  listSharedNoteTimersOffset: 0,
  sharedNoteTimers: {},
  createNoteTimerError: null,
  noteTimerListError: null,
  listSharedNoteTimersError: null,
  updateNoteTimerError: null,
}

const normalizeSingle = ({ parentNotesOfNoteTimers }, { data }) => {
  const { note_id } = data
  const newNoteTimers = checkProperty({
    obj: parentNotesOfNoteTimers,
    property: note_id,
    failFn: () => ({
      [data.id]: data,
    }),
    recursiveFn: obj =>
      checkProperty({
        obj,
        property: "note_timers",
        successFn: () => ({
          ...obj["note_timers"],
          [data.id]: data,
        }),
        failFn: () => ({
          [data.id]: data,
        }),
      }),
  })
  const newListOffset = checkProperty({
    obj: parentNotesOfNoteTimers,
    property: note_id,
    successFn: () => parentNotesOfNoteTimers[note_id].listOffset + 1,
    failFn: () => 1,
  })
  return {
    [note_id]: {
      noteTimersPaginationEnd: true,
      note_timers: {
        ...parentNotesOfNoteTimers[note_id].note_timers,
        ...newNoteTimers,
      },
      listOffset: newListOffset,
    },
  }
}

const normalize = key => (noteTimerState, { data }) =>
  data[key].reduce((acc, resource, i) => {
    const noteTimersPaginationEnd = data[key].length !== 20
    if (i === 0) {
      // NOTE: Doing this to ensure that listOffset is only incremented once while
      // iterating through the list of notes retrieved from the API.
      if (acc[resource.note_id]) {
        // Updating a current topic's notes
        acc = {
          ...acc,
          [resource.note_id]: {
            ...acc[resource.note_id],
            noteTimersPaginationEnd,
            note_timers: {
              ...acc[resource.note_id].notes,
              [resource.id]: resource,
            },
            listOffset:
              noteTimerState.parentNotesOfNoteTimers[resource.note_id]
                .listOffset + data[key].length,
          },
        }
      } else {
        // Creating a new entry for a topic's notes
        acc[resource.note_id] = {
          noteTimersPaginationEnd,
          note_timers: {
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
        [resource.note_id]: {
          ...acc[resource.note_id],
          noteTimersPaginationEnd,
          note_timers: {
            ...acc[resource.note_id].note_timers,
            [resource.id]: resource,
          },
        },
      }
    }
    return acc
  }, {})

const normalizeNoteTimers = normalize("note_timers")

const updateNormalizedSingle = (
  { parentNotesOfNoteTimers },
  { note_id, data }
) => {
  const updatedNoteTimer = checkProperty({
    obj: parentNotesOfNoteTimers,
    property: note_id,
    failFn: () => ({
      [data.id]: data,
    }),
    recursiveFn: obj =>
      checkProperty({
        obj,
        property: "note_timers",
        successFn: () => ({
          ...obj["note_timers"],
          [data.id]: {
            ...parentNotesOfNoteTimers[note_id].note_timers[data.id],
            ...data,
          },
        }),
        failFn: () =>
          console.log("failFn in updated noteTimerReducer shouldn't run..."),
      }),
  })
  return {
    [note_id]: {
      ...parentNotesOfNoteTimers[note_id],
      note_timers: {
        ...parentNotesOfNoteTimers[note_id].note_timers,
        ...updatedNoteTimer,
      },
    },
  }
}

const removeNoteTimer = ({ parentNotesOfNoteTimers }, { note_id, data }) => {
  const filteredNoteTimers = Object.keys(
    parentNotesOfNoteTimers[note_id]["note_timers"]
  ).reduce((acc, key) => {
    if (parentNotesOfNoteTimers[note_id]["note_timers"][key].id !== data.id) {
      acc[parentNotesOfNoteTimers[note_id]["note_timers"][key].id] =
        parentNotesOfNoteTimers[note_id]["note_timers"][key]
    }
    return acc
  }, {})

  const newListOffset = checkProperty({
    obj: parentNotesOfNoteTimers,
    property: note_id,
    successFn: () => parentNotesOfNoteTimers[note_id].listOffset - 1,
    failFn: () => 1,
  })

  return {
    [note_id]: {
      ...parentNotesOfNoteTimers[note_id],
      note_timers: {
        ...filteredNoteTimers,
      },
      listOffset: newListOffset,
    },
  }
}

export default function noteTimerReducer(
  noteTimerState = noteTimerInitialState,
  { type, payload }
) {
  if (type === SET_CREATED_NOTE_TIMER) {
    return {
      ...noteTimerState,
      parentNotesOfNoteTimers: {
        ...noteTimerState.parentNotesOfNoteTimers,
        ...normalizeSingle(noteTimerState, payload),
      },
    }
  }
  if (type === SET_NOTE_TIMER_LIST) {
    return noteTimerListNewState(noteTimerState, payload)
  }
  if (type === SET_UPDATED_NOTE_TIMER) {
    return {
      ...noteTimerState,
      parentNotesOfNoteTimers: {
        ...noteTimerState.parentNotesOfNoteTimers,
        ...updateNormalizedSingle(noteTimerState, payload),
      },
    }
  }
  if (type === SET_DELETED_NOTE_TIMER) {
    console.log("the payload in removeNoteTimer:")
    console.log(payload)
    return {
      ...noteTimerState,
      parentNotesOfNoteTimers: {
        ...noteTimerState.parentNotesOfNoteTimers,
        ...removeNoteTimer(noteTimerState, payload),
      },
    }
  }
  if (type === SET_CREATE_NOTE_TIMER_ERROR) {
    return { ...noteTimerState, createNoteTimerError: payload }
  }
  return noteTimerState
}

const noteTimerListNewState = (noteTimerState, payload) => {
  return {
    ...noteTimerState,
    parentNotesOfNoteTimers: {
      ...noteTimerState.parentNotesOfNoteTimers,
      ...normalizeNoteTimers(noteTimerState, payload),
    },
  }
}
