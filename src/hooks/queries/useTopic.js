import { useSelector } from "react-redux"

export function useTopic() {
  return useSelector(state => state.topic)
}
