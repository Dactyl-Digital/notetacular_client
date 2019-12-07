import { useDispatch } from "react-redux"
import { apiRequest } from "../../store/actions/api"
import {
  setCreatedNote,
  setCreateNoteError,
  setNoteList,
  setNoteListError,
  setUpdateNoteContent,
  setUpdateNoteContentError,
} from "../../store/actions/note"
import { updateTopicNoteIdList } from "../../store/actions/topic"
import {
  CREATE_NOTE_URL,
  LIST_NOTES_URL,
  UPDATE_NOTE_CONTENT_URL,
} from "../../api-endpoints"

export const createNote = dispatch => createNoteData => {
  dispatch(
    apiRequest({
      method: "POST",
      url: CREATE_NOTE_URL,
      payload: createNoteData,
      onSuccess: createNoteSuccess(dispatch),
      onError: createNoteError(dispatch),
    })
  )
}

const createNoteSuccess = dispatch => response => {
  dispatch(updateTopicNoteIdList(response.data.data))
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
      onSuccess: updateNoteContentSuccess(topicId)(dispatch),
      onError: updateNoteContentError(dispatch),
    })
  )
}

// ({
//   note_id,
//   content_markdown,
//   content_text,
// }) =>
const updateNoteContentSuccess = topicId => dispatch => response => {
  dispatch(setUpdateNoteContent({ ...response, topicId }))
}

const updateNoteContentError = dispatch => error => {
  dispatch(setUpdateNoteContentError(error))
}

export function useNoteActions() {
  const dispatch = useDispatch()

  return {
    createNote: createNote(dispatch),
    listNotes: listNotes(dispatch),
    updateNoteContent: updateNoteContent(dispatch),
  }
}
