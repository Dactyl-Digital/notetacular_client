import { useSelector } from "react-redux"

export function useUi() {
  return useSelector(state => state.ui)
}
