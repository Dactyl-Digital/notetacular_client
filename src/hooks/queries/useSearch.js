import { useSelector } from "react-redux"

export function useSearch() {
  return useSelector(state => state.search)
}
