import { useSelector } from "react-redux"

export function useSubCategory() {
  return useSelector(state => state.subCategory)
}
