import { useSelector } from "react-redux"

export function useNote() {
  return useSelector(state => state.note)
}
