export const SET_CREATED_NOTE_TIMER = "SET_CREATED_NOTE_TIMER"
export const SET_CREATE_NOTE_TIMER_ERROR = "SET_CREATE_NOTE_TIMER_ERROR"
export const SET_UPDATED_NOTE_TIMER = "SET_UPDATED_NOTE_TIMER"
export const SET_UPDATE_NOTE_TIMER_ERROR = "SET_UPDATE_NOTE_TIMER_ERROR"
export const SET_DELETED_NOTE_TIMER = "SET_DELETED_NOTE_TIMER"
export const SET_DELETE_NOTE_TIMER_ERROR = "SET_DELETE_NOTE_TIMER_ERROR"

export const setCreatedNoteTimer = ({ data }) => ({
  type: SET_CREATED_NOTE_TIMER,
  payload: data,
  meta: {
    trigger:
      "POST to /api/note-timer was successful and created note will be added to \
              the reducer's note timer state.",
  },
})

export const setCreateNoteTimerError = error => ({
  type: SET_CREATE_NOTE_TIMER_ERROR,
  payload: error,
  meta: {
    trigger: "Server failed to create note timer.",
  },
})

export const setUpdatedNoteTimer = ({ data }) => ({
  type: SET_UPDATED_NOTE_TIMER,
  payload: data,
  meta: {
    trigger:
      "POST to /api/note-timer was successful and updated note will be updated in \
              the reducer's note timer state.",
  },
})

export const setUpdateNoteTimerError = error => ({
  type: SET_UPDATE_NOTE_TIMER_ERROR,
  payload: error,
  meta: {
    trigger: "Server failed to update note timer.",
  },
})

export const setDeletedNoteTimer = ({ data }) => ({
  type: SET_DELETED_NOTE_TIMER,
  payload: data,
  meta: {
    trigger:
      "POST to /api/note-timer was successful and deleted note will be removed from \
              the reducer's note timer state.",
  },
})

export const setDeleteNoteTimerError = error => ({
  type: SET_DELETE_NOTE_TIMER_ERROR,
  payload: error,
  meta: {
    trigger: "Server failed to delete note timer.",
  },
})
