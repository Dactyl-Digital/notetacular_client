import React from "react"
import SearchIcon from "./icons/search-icon"

const Search = () => {
  return (
    <>
      <div onClick={() => console.log("clicked!")}>
        <SearchIcon />
      </div>
    </>
  )
}

export default Search
