import React, { useState } from "react"

const SearchContext = React.createContext({
  resetSearch: () => {},
  resetSearchAndToggle: () => {},
  searchVal: "",
  handleInputChange: () => {},
  searchResults: [],
  retrievedSearchResults: false,
  page: 0,
  handleBack: () => {},
  handleNext: () => {},
  loading: false,
  loadingResource: null,
})

export function useSearchState() {
  return React.useContext(SearchContext)
}

export default function SearchProvider({ children, initialSearchState }) {
  return (
    <SearchContext.Provider value={{ ...initialSearchState }}>
      {children}
    </SearchContext.Provider>
  )
}
