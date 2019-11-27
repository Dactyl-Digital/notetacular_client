import { useSelector } from "react-redux"

export function useNotebook() {
  return useSelector(state => state.notebook)
}
