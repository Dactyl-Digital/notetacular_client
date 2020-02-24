import { useDispatch } from "react-redux"
import { apiRequest } from "../../store/actions/api"
import {
  CREATE_NOTE,
  LIST_NOTES,
  UPDATE_NOTE_CONTENT,
} from "../../store/actions/ui"
import {
  setCreatedNote,
  setCreateNoteError,
  setNoteList,
  setNoteListError,
  removeDeletedNote,
  setDeleteNoteError,
  setUpdateNoteContent,
  setUpdateNoteContentError,
  setAddedNoteTags,
  setAddedNoteTagsError,
  setRemovedNoteTag,
  setRemoveNoteTagError,
} from "../../store/actions/note"
import { updateTopicNoteIdList } from "../../store/actions/topic"
import {
  NOTE_URL,
  LIST_NOTES_URL,
  UPDATE_NOTE_CONTENT_URL,
  ADD_NOTE_TAGS_URL,
  REMOVE_NOTE_TAG_URL,
} from "../../api-endpoints"

export const createNote = dispatch => ({
  sub_category_id,
  ...createNoteData
}) => {
  dispatch(
    apiRequest({
      method: "POST",
      url: NOTE_URL,
      payload: createNoteData,
      loadingResource: CREATE_NOTE,
      onSuccess: createNoteSuccess({ sub_category_id })(dispatch),
      onError: createNoteError(dispatch),
    })
  )
}

const createNoteSuccess = ({ sub_category_id }) => dispatch => response => {
  dispatch(updateTopicNoteIdList({ sub_category_id, ...response.data.data }))
  dispatch(setCreatedNote(response))
}

const createNoteError = dispatch => error => {
  dispatch(setCreateNoteError(error))
}

export const deleteNote = dispatch => ({ topic_id, note_id }) => {
  dispatch(
    apiRequest({
      method: "DELETE",
      url: `${NOTE_URL}/${note_id}`,
      payload: {},
      onSuccess: deleteNoteSuccess({ topic_id, note_id })(dispatch),
      onError: deleteNoteError(dispatch),
    })
  )
}

const deleteNoteSuccess = ({ topic_id, note_id }) => dispatch => _response => {
  dispatch(removeDeletedNote({ topic_id, note_id }))
}

const deleteNoteError = dispatch => error => {
  dispatch(setDeleteNoteError(error))
}

// Listing notes requires this to be sent on the request body:
// note_id_list
export const listNotes = dispatch => ({ topicId, offset, note_id_list }) => {
  dispatch(
    apiRequest({
      method: "GET",
      url: `${LIST_NOTES_URL}${offset}`,
      payload: { note_id_list },
      parentResource: `topic-${topicId}`,
      loadingResource: LIST_NOTES,
      onSuccess: listNotesSuccess(dispatch),
      onError: listNotesError(dispatch),
    })
  )
}

const listNotesSuccess = dispatch => response => {
  dispatch(setNoteList(response))
}

const listNotesError = dispatch => error => {
  dispatch(setNoteListError(error))
}

export const updateNoteContent = dispatch => ({
  subCategoryId,
  topicId,
  note_id,
  content_markdown,
  content_text,
  showSaveSuccess,
  showSaveError,
}) => {
  dispatch(
    apiRequest({
      method: "PUT",
      url: UPDATE_NOTE_CONTENT_URL,
      payload: {
        note_id,
        content_markdown,
        content_text,
      },
      loadingResource: UPDATE_NOTE_CONTENT,
      onSuccess: updateNoteContentSuccess(showSaveSuccess)({
        subCategoryId,
        topicId,
      })(dispatch),
      onError: updateNoteContentError(showSaveError)(dispatch),
    })
  )
}

const updateNoteContentSuccess = onSaveSuccess => ({
  subCategoryId,
  topicId,
}) => dispatch => response => {
  onSaveSuccess()
  dispatch(setUpdateNoteContent({ ...response, subCategoryId, topicId }))
}

const updateNoteContentError = onSaveError => dispatch => error => {
  onSaveError()
  dispatch(setUpdateNoteContentError(error))
}

export const addNoteTags = dispatch => data => {
  dispatch(
    apiRequest({
      method: "POST",
      url: ADD_NOTE_TAGS_URL,
      payload: data,
      onSuccess: addNoteTagsSuccess(dispatch),
      onError: addNoteTagsError(dispatch),
    })
  )
}

const addNoteTagsSuccess = dispatch => response => {
  dispatch(setAddedNoteTags(response))
}

const addNoteTagsError = dispatch => error => {
  dispatch(setAddedNoteTagsError(error))
}

export const removeNoteTag = dispatch => data => {
  dispatch(
    apiRequest({
      method: "PATCH",
      url: REMOVE_NOTE_TAG_URL,
      payload: data,
      onSuccess: removeNoteTagSuccess(dispatch),
      onError: removeNoteTagError(dispatch),
    })
  )
}

const removeNoteTagSuccess = dispatch => response => {
  dispatch(setRemovedNoteTag(response))
}

const removeNoteTagError = dispatch => error => {
  dispatch(setRemoveNoteTagError(error))
}

export function useNoteActions() {
  const dispatch = useDispatch()

  return {
    createNote: createNote(dispatch),
    clearCreateNoteError: createNoteError(dispatch),
    listNotes: listNotes(dispatch),
    deleteNote: deleteNote(dispatch),
    updateNoteContent: updateNoteContent(dispatch),
    addNoteTags: addNoteTags(dispatch),
    removeNoteTag: removeNoteTag(dispatch),
  }
}
