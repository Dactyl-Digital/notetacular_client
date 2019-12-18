import { useDispatch } from "react-redux"
import { apiRequest } from "../../store/actions/api"
import {
  setCreatedNote,
  setCreateNoteError,
  setNoteList,
  setNoteListError,
  setUpdateNoteContent,
  setUpdateNoteContentError,
  setAddedNoteTags,
  setAddedNoteTagsError,
  setRemovedNoteTag,
  setRemoveNoteTagError,
} from "../../store/actions/note"
import { updateTopicNoteIdList } from "../../store/actions/topic"
import {
  CREATE_NOTE_URL,
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
      url: CREATE_NOTE_URL,
      payload: createNoteData,
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

// Listing notes requires this to be sent on the request body:
// note_id_list
export const listNotes = dispatch => ({ offset, note_id_list }) => {
  dispatch(
    apiRequest({
      method: "GET",
      url: `${LIST_NOTES_URL}${offset}`,
      payload: { note_id_list },
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
      onSuccess: updateNoteContentSuccess({ subCategoryId, topicId })(dispatch),
      onError: updateNoteContentError(dispatch),
    })
  )
}

const updateNoteContentSuccess = ({
  subCategoryId,
  topicId,
}) => dispatch => response => {
  dispatch(setUpdateNoteContent({ ...response, subCategoryId, topicId }))
}

const updateNoteContentError = dispatch => error => {
  dispatch(setUpdateNoteContentError(error))
}

export const addNoteTags = dispatch => data => {
  console.log("Dispatching addNoteTags API REQUEST")
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
    listNotes: listNotes(dispatch),
    updateNoteContent: updateNoteContent(dispatch),
    addNoteTags: addNoteTags(dispatch),
    removeNoteTag: removeNoteTag(dispatch),
  }
}
