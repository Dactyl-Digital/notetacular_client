export const SET_CREATED_NOTE = "SET_CREATED_NOTE"
export const SET_NOTE_LIST = "SET_NOTE_LIST"
export const LIST_SHARED_NOTES = "LIST_SHARED_NOTES"
export const SET_CREATE_NOTE_ERROR = "SET_CREATE_NOTE_ERROR"
export const SET_NOTE_LIST_ERROR = "SET_NOTE_LIST_ERROR"
export const SET_LIST_SHARED_NOTE_ERROR = "SET_LIST_SHARED_NOTE_ERROR"
export const SET_UPDATE_NOTE_CONTENT = "SET_UPDATE_NOTE_CONTENT"
export const SET_UPDATE_NOTE_CONTENT_ERROR = "SET_UPDATE_NOTE_CONTENT_ERROR"
export const SET_ADD_NOTE_TAGS = "SET_ADD_NOTE_TAGS"
export const SET_ADD_NOTE_TAGS_ERROR = "SET_ADD_NOTE_TAGS_ERROR"
export const SET_REMOVED_NOTE_TAG = "SET_REMOVED_NOTE_TAG"
export const SET_REMOVE_NOTE_TAG_ERROR = "SET_REMOVE_NOTE_TAG_ERROR"

export const setCreatedNote = ({ data }) => ({
  type: SET_CREATED_NOTE,
  payload: data,
  meta: {
    trigger:
      "POST to /api/note was successful and created note will be added to \
              the reducer's notes.",
  },
})

export const setCreateNoteError = ({ response: { data } }) => ({
  type: SET_CREATE_NOTE_ERROR,
  payload: data,
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

export const setUpdateNoteContent = ({ data, topicId }) => ({
  type: SET_UPDATE_NOTE_CONTENT,
  payload: { data, topicId },
  meta: {
    trigger:
      "PUT to /api/note/content was successful and the updated note's content will be added to \
              the note in the reducer.",
  },
})

export const setUpdateNoteContentError = ({ response: { data } }) => ({
  type: SET_UPDATE_NOTE_CONTENT_ERROR,
  payload: data,
  meta: {
    trigger: "Server failed to update note.",
  },
})

export const setAddedNoteTags = ({ data }) => ({
  type: SET_ADD_NOTE_TAGS,
  payload: data,
  meta: {
    trigger: "A note successfully had new tags added to it.",
  },
})

export const setAddedNoteTagsError = ({ response: { data } }) => ({
  type: SET_ADD_NOTE_TAGS_ERROR,
  payload: data,
  meta: {
    trigger: "An error occured while attempting to add new tags to a note.",
  },
})

export const setRemovedNoteTag = ({ data }) => ({
  type: SET_REMOVED_NOTE_TAG,
  payload: data,
  meta: {
    trigger: "A note successfully had a tag removed from it.",
  },
})

export const setRemoveNoteTagError = ({ response: { data } }) => ({
  type: SET_REMOVE_NOTE_TAG_ERROR,
  payload: data,
  meta: {
    trigger: "An error occured while attempting to remove a tag from a note.",
  },
})
