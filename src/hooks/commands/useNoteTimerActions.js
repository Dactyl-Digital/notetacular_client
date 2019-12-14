import { useDispatch } from "react-redux"
import { apiRequest } from "../../store/actions/api"
import {
  setCreatedNoteTimer,
  setCreateNoteTimerError,
  setNoteTimerList,
  setNoteTimerListError,
  setUpdatedNoteTimer,
  setUpdateNoteTimerError,
  setDeletedNoteTimer,
  setDeleteNoteTimerError,
} from "../../store/actions/note-timer"
import { NOTE_TIMER_URL, LIST_NOTE_TIMERS_URL } from "../../api-endpoints"

export const createNoteTimer = dispatch => createNoteTimerData => {
  dispatch(
    apiRequest({
      method: "POST",
      url: NOTE_TIMER_URL,
      payload: createNoteTimerData,
      onSuccess: createNoteTimerSuccess(dispatch),
      onError: createNoteTimerError(dispatch),
    })
  )
}

const createNoteTimerSuccess = dispatch => response => {
  dispatch(setCreatedNoteTimer(response))
}

const createNoteTimerError = dispatch => error => {
  dispatch(setCreateNoteTimerError(error))
}

export const listNoteTimers = dispatch => ({ offset, note_timer_id_list }) => {
  console.log("dispatching note_timer_id_list: ", note_timer_id_list)
  dispatch(
    apiRequest({
      method: "GET",
      url: `${LIST_NOTE_TIMERS_URL}${offset}`,
      payload: { note_timer_id_list },
      onSuccess: listNoteTimersSuccess(dispatch),
      onError: listNoteTimersError(dispatch),
    })
  )
}

const listNoteTimersSuccess = dispatch => response => {
  dispatch(setNoteTimerList(response))
}

const listNoteTimersError = dispatch => error => {
  dispatch(setNoteTimerListError(error))
}

export const updateNoteTimer = dispatch => ({
  note_id,
  ...updateNoteTimerData
}) => {
  dispatch(
    apiRequest({
      method: "PATCH",
      url: NOTE_TIMER_URL,
      payload: updateNoteTimerData,
      onSuccess: updateNoteTimerSuccess({ note_id })(dispatch),
      onError: updateNoteTimerError(dispatch),
    })
  )
}

const updateNoteTimerSuccess = ({ note_id }) => dispatch => response => {
  dispatch(setUpdatedNoteTimer({ note_id, ...response }))
}

const updateNoteTimerError = dispatch => error => {
  dispatch(setUpdateNoteTimerError(error))
}

export const deleteNoteTimer = dispatch => ({ note_timer_id }) => {
  dispatch(
    apiRequest({
      method: "DELETE",
      url: `${NOTE_TIMER_URL}/${note_timer_id}`,
      payload: {},
      onSuccess: deleteNoteTimerSuccess(dispatch),
      onError: deleteNoteTimerError(dispatch),
    })
  )
}

const deleteNoteTimerSuccess = ({ note_id }) => dispatch => response => {
  dispatch(setDeletedNoteTimer({ note_id, ...response }))
}

const deleteNoteTimerError = dispatch => error => {
  dispatch(setDeleteNoteTimerError(error))
}

export function useNoteTimerActions() {
  const dispatch = useDispatch()

  return {
    createNoteTimer: createNoteTimer(dispatch),
    listNoteTimers: listNoteTimers(dispatch),
    updateNoteTimer: updateNoteTimer(dispatch),
    deleteNoteTimer: deleteNoteTimer(dispatch),
  }
}
