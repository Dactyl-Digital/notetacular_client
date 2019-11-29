import { useDispatch } from "react-redux"
import { apiRequest } from "../../store/actions/api"
import {
  setCreatedNote,
  setCreateNoteError,
  setNoteList,
  setNoteListError,
} from "../../store/actions/note"
import { CREATE_NOTE_URL, LIST_NOTES_URL } from "../../api-endpoints"

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

export function useNoteActions() {
  const dispatch = useDispatch()

  return {
    createNote: createNote(dispatch),
    listNotes: listNotes(dispatch),
  }
}
