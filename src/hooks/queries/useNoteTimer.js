import { useSelector } from "react-redux"

export function useNoteTimer() {
  return useSelector(state => state.noteTimer)
}
