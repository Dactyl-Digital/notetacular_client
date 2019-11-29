export const SET_CREATED_NOTE = "SET_CREATED_NOTE"
export const SET_NOTE_LIST = "SET_NOTE_LIST"
export const LIST_SHARED_NOTES = "LIST_SHARED_NOTES"
export const SET_CREATE_NOTE_ERROR = "SET_CREATE_NOTE_ERROR"
export const SET_NOTE_LIST_ERROR = "SET_NOTE_LIST_ERROR"
export const SET_LIST_SHARED_NOTE_ERROR = "SET_LIST_SHARED_NOTE_ERROR"

export const setCreatedNote = ({ data }) => ({
  type: SET_CREATED_NOTE,
  payload: data,
  meta: {
    trigger:
      "POST to /api/note was successful and created note will be added to \
              the reducer's notes.",
  },
})

export const setCreateNoteError = error => ({
  type: SET_CREATE_NOTE_ERROR,
  payload: error,
  meta: {
    trigger: "Server failed to create note.",
  },
})

export const setNoteList = ({ data }) => ({
  type: SET_NOTE_LIST,
  payload: data,
  meta: {
    trigger:
      "POST to /api/note was successful and created note will be added to \
              the reducer's notes.",
  },
})

export const setNoteListError = ({ response: { data } }) => ({
  type: SET_NOTE_LIST_ERROR,
  payload: data,
  meta: {
    trigger: "Server failed to list notes.",
  },
})
