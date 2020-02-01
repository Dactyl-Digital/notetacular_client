import React, { useState, useEffect, useRef } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Modal from "../modal"
import SearchIcon from "../icons/search-icon"
import XIcon from "../icons/x-icon"
import ArrowIcon from "../icons/arrow-icon"
import { LIST_SEARCH_RESULTS } from "../../../store/actions/ui"
import { useUi } from "../../../hooks/queries/useUi"
import { useSearch } from "../../../hooks/queries/useSearch"
import { useSearchActions } from "../../../hooks/commands/useSearchActions"
import SearchProvider, { useSearchState } from "./search-provider"

const PAGE_AMOUNT = 10

// OBSOLETE TODO:
// Was going to do this. But went with an easier implementation, but stil might mess around with this anim in the future.
// Implement this style of GSAP animation for the searchbar's toggle.
// https://greensock.com/forums/topic/17480-gsap-collapsingexpanding-hidden-content/?do=findComment&comment=78853

const Container = styled.div`
  /* border: 2px solid #222; */
  height: 70vh;
  min-height: 16rem;
  max-height: 20rem;

  #search-container {
    display: flex;
    flex-direction: column;
    max-height: 20rem;
    /* border: 2px solid #222; */

    #x-icon-container {
      display: flex;
      align-items: center;
      padding-right: 0.6rem;

      svg {
        width: 0.8rem;
        height: 0.8rem;
      }
    }

    #search-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 60vw;
      max-width: 36rem;
      min-width: 18rem;
      background: #fcfcfc;
      border-radius: 5px;
      border-bottom-left-radius: ${props =>
        props.searchResultsVisible && "0px"};
      border-bottom-right-radius: ${props =>
        props.searchResultsVisible && "0px"};
      height: 2.4rem;
      border-bottom: ${props =>
        props.searchResultsVisible && "0.15rem solid rgb(150, 148, 148, 20%)"};

      input {
        width: 100%;
        height: 100%;
        border: 1px solid rgba(0, 0, 0, 0);
        background: #fcfcfc;
        color: #656565;
        font-family: "Blinker", sans-serif;
        font-weight: 600;
        font-size: 1.1rem;
        padding-left: 0.6rem;
        border-radius: 5px;

        &:focus {
          outline: none;
          /* border-top-left-radius: 5px;
          border-top-right-radius: 5px; */
        }
      }
    }

    #search-results {
      overflow-y: scroll;
      background: #fcfcfc;
      width: 60vw;
      max-width: 36rem;
      min-width: 18rem;
      padding: 0 1rem;
      padding-top: 1rem;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;

      a {
        text-decoration: none;
      }

      p {
        font-size: 0.9rem;
        font-family: "Blinker", sans-serif;
        width: 80%;
      }

      #arrows-container {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.8rem;

        #back-arrow {
          display: flex;
          align-items: center;

          span {
            margin-left: 0.4rem;
            font-size: 0.7rem;
          }

          &:hover {
            cursor: pointer;
          }
        }

        #next-arrow {
          display: flex;
          align-items: center;

          span {
            margin-right: 0.4rem;
            font-size: 0.7rem;

            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }

    .search-result {
      display: flex;
      justify-content: space-between;
    }

    .search-result-title {
      font-size: 1.1rem;
      font-family: "Blinker", sans-serif;
      color: #11eef6;
      text-shadow: 0.1rem 0.1rem #1b7171;
    }

    #no-results-found {
      font-size: 1.2rem;
      font-weight: 600;
      font-family: "Blinker", sans-serif;
      color: #656565;
    }
  }
`

const SearchResultsPaginationView = ({
  children,
  searchResults,
  page,
  resetSearchAndToggle,
}) => (
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
          <div
            id={`search_result-${note_id}-${title}`}
            className="search-result"
          >
            <Link
              to={`/app/notebook/${notebook_id}/sub-category/${sub_category_id}/topics#topic-${topic_id}-note-${note_id}`}
              onClick={() => resetSearchAndToggle()}
            >
              <h4 className="search-result-title">{title}</h4>
            </Link>
            {/* FUTURE TODO: Highlight the search term within the search result's context text */}
            <p>{content_text.slice(0, 60) + "..."}</p>
          </div>
        ) : null
    )}
    {children}
  </>
)

const EmptySearchResults = () => (
  <>
    <p id="no-results-found">No Results Found</p>
  </>
)

const SearchBar = () => {
  const {
    resetSearchAndToggle,
    searchVal,
    handleInputChange,
  } = useSearchState()

  const inputRef = useRef(null)
  useEffect(() => inputRef.current.focus(), [])

  return (
    <div id="search-bar">
      <input
        ref={inputRef}
        type="text"
        value={searchVal}
        onChange={handleInputChange}
      ></input>
      <div id="x-icon-container" onClick={() => resetSearchAndToggle()}>
        <XIcon />
      </div>
    </div>
  )
}

const SearchResults = () => {
  const {
    resetSearch,
    resetSearchAndToggle,
    searchResults,
    retrievedSearchResults,
    page,
    handleBack,
    handleNext,
    loading,
    loadingResource,
  } = useSearchState()

  useEffect(() => resetSearch(), [])

  return (
    <>
      {((loading && loadingResource === LIST_SEARCH_RESULTS) ||
        retrievedSearchResults) && (
        <div id="search-results">
          {loading && <h1>Loading...</h1>}
          {searchResults.length === 0 && retrievedSearchResults && (
            <EmptySearchResults />
          )}
          {searchResults.length !== 0 && (
            <SearchResultsPaginationView
              searchResults={searchResults}
              page={page}
              resetSearchAndToggle={resetSearchAndToggle}
            >
              <div id="arrows-container">
                <div id="back-arrow" onClick={handleBack}>
                  <ArrowIcon arrowType="PREV" /> <span>Prev</span>
                </div>
                <div id="next-arrow" onClick={handleNext}>
                  <span>Next</span> <ArrowIcon arrowType="NEXT" />
                </div>
              </div>
            </SearchResultsPaginationView>
          )}
        </div>
      )}
    </>
  )
}

const Search = () => {
  const { loading, loadingResource } = useUi()
  const {
    offset,
    searchResults,
    totalResults,
    retrievedSearchResults,
    paginationEnd,
    searchError,
  } = useSearch()
  const { clearSearch, search } = useSearchActions()
  const [searchVal, setSearchVal] = useState("")
  const [page, setPage] = useState(0)
  const [timeoutFn, setTimeoutFn] = useState(null)

  const handleInputChange = e => {
    if (retrievedSearchResults) clearSearch()
    setSearchVal(e.target.value)
    clearTimeout(timeoutFn)
    const val = e.target.value
    setTimeoutFn(setTimeout(() => search({ search_text: val, offset }), 500))
  }

  const handleBack = () => {
    if (page !== 0) {
      setPage(page - 1)
    }
  }

  const handleNext = () => {
    // NOTE: remainderPresent and pages facilitate not allowing the user
    // to click next to the point where no search results are shown.
    const remainderPresent = totalResults % PAGE_AMOUNT > 0 && 1
    const pages = remainderPresent
      ? Math.floor(totalResults / PAGE_AMOUNT) + remainderPresent
      : Math.floor(totalResults / PAGE_AMOUNT)
    if (!paginationEnd) {
      // May need to move this elsewhere...
      setPage(page + 1)
      return search({ search_text: searchVal, offset })
    }
    if (page < pages - 1) {
      setPage(page + 1)
    }
  }

  const resetSearch = () => {
    if (retrievedSearchResults) {
      setSearchVal("")
      clearSearch()
    }
  }

  return (
    <Modal resource="Search" IconComponent={SearchIcon} buttonType="ICON">
      {toggleModal => {
        const initialSearchState = {
          resetSearch,
          resetSearchAndToggle: () => {
            toggleModal(false)
            resetSearch()
            // setSearchVal("")
            // if (retrievedSearchResults) {
            //   clearSearch()
            // }
          },
          searchVal,
          handleInputChange,
          searchResults,
          retrievedSearchResults,
          page,
          handleBack,
          handleNext,
          loading,
          loadingResource,
        }
        return (
          <SearchProvider initialSearchState={initialSearchState}>
            <Container
              searchResultsVisible={
                retrievedSearchResults ||
                (loading && loadingResource === LIST_SEARCH_RESULTS)
              }
            >
              <div id="search-container">
                <SearchBar />
                <SearchResults />
              </div>
            </Container>
          </SearchProvider>
        )
      }}
    </Modal>
  )
}

export default Search
