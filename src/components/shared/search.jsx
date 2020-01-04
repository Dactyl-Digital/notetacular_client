import React, { useState } from "react"
import styled from "styled-components"
import SearchIcon from "./icons/search-icon"
import { useSearch } from "../../hooks/queries/useSearch"
import { useSearchActions } from "../../hooks/commands/useSearchActions"

const PAGE_AMOUNT = 10

// TODO:
// Implement this style of GSAP animation for the searchbar's toggle.
// https://greensock.com/forums/topic/17480-gsap-collapsingexpanding-hidden-content/?do=findComment&comment=78853

const Container = styled.div`
  position: relative;

  #search-container {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: -14rem;
    z-index: 8998;
    overflow: hidden;
    max-width: 0rem;
    transition: max-width 0.6s ease-in-out;
    /* NOTE: Applying a percentage width doesn't trigger the transition */
    max-width: ${props => props.toggled && `20rem`};

    max-height: 0rem;
    transition: max-height 0.6s ease-in-out;
    /* NOTE: Applying a percentage height doesn't trigger the transition */
    max-height: ${props => props.toggled && `20rem`};

    border: 2px solid #222;


    /* h3 {
      display: none;
      display: ${props => props.toggled && `block`};
    }

    input {
      display: none;
      display: ${props => props.toggled && `block`};
    } */

    #search-results {
      overflow-y: scroll;
    }
  }
`

const SearchResultsPaginationView = ({ children, searchResults, page }) => (
  <>
    {searchResults.map(
      (
        {
          note_id,
          topic_id,
          sub_category_id,
          notebook_id,
          title,
          content_text,
        },
        idx
      ) =>
        idx >= page * PAGE_AMOUNT && idx < (page + 1) * PAGE_AMOUNT ? (
          // TODO: Implement fetching alll of the notes associated under the topic_id
          //       and scrollTo/focus on the particular note in the UI
          // Steps to facilitate this process:
          // 1. Create an endpoint on the backend to fetch a topic by id (w/ a list of all
          //    associated note_ids)
          // 2. Follow up with listNotes action to retrieve paginated note results...
          <div id={`search_result-${note_id}-${title}`}>
            <h4>{title}</h4>
            <p>{content_text}</p>
          </div>
        ) : null
    )}
    {children}
  </>
)

const EmptySearchResults = () => (
  <>
    <p>No Results Found</p>
  </>
)

const Search = () => {
  const {
    offset,
    searchResults,
    totalResults,
    paginationEnd,
    searchError,
  } = useSearch()
  const { clearSearch, search } = useSearchActions()
  const [toggled, setToggled] = useState(false)
  const [searchVal, setSearchVal] = useState("")
  const [page, setPage] = useState(0)
  const [timeoutFn, setTimeoutFn] = useState(null)

  const handleInputChange = e => {
    if (totalResults !== 0) clearSearch()
    setSearchVal(e.target.value)
    clearTimeout(timeoutFn)
    const val = e.target.value
    setTimeoutFn(setTimeout(() => search({ search_text: val, offset }), 1000))
  }

  const handleBack = () => {
    if (page !== 0) {
      setPage(page - 1)
    }
  }

  const handleNext = () => {
    if (!paginationEnd) {
      // May need to move this elsewhere...
      setPage(page + 1)
      return search({ search_text: searchVal, offset })
    }
    if (page * PAGE_AMOUNT <= totalResults) {
      setPage(page + 1)
    }
  }

  return (
    <Container toggled={toggled}>
      <div onClick={() => setToggled(!toggled)}>
        <SearchIcon />
      </div>
      <div id="search-container">
        <h3>Search</h3>
        <input
          type="text"
          value={searchVal}
          onChange={handleInputChange}
        ></input>
        {searchResults.length !== 0 && (
          <div id="search-results">
            {totalResults !== 0 ? (
              <SearchResultsPaginationView
                searchResults={searchResults}
                page={page}
              >
                <button onClick={handleBack}>Prev</button>
                <button onClick={handleNext}>Next</button>
              </SearchResultsPaginationView>
            ) : (
              <EmptySearchResults />
            )}
          </div>
        )}
      </div>
    </Container>
  )
}

export default Search
