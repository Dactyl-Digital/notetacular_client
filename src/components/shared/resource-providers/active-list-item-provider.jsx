import React, { useState, useEffect, useContext } from "react"
import { onResourceLoadScrollIntoView } from "../../app/helpers"

const scrollActiveNotebookIntoView = activeCircle => {
  let hash
  if (typeof window !== "undefined") {
    hash = window.location.hash
  }
  if (hash && !activeCircle.active) {
    const id = hash.slice(1, hash.length)
    onResourceLoadScrollIntoView(id)
  }
}

const ActiveListItemContext = React.createContext({
  activeCircle: {},
  setActiveCircle: () => {},
  setActive: () => {},
  setActiveDisabled: false,
  setSetActiveDisabled: () => {},
})

export function useActiveListItemState() {
  return useContext(ActiveListItemContext)
}

export default function ActiveListItemProvider({ children }) {
  let [activeCircle, setActiveCircle] = useState({
    active: null,
    activePosition: 0,
  })
  const [setActiveDisabled, setSetActiveDisabled] = useState(false)

  useEffect(() => {
    scrollActiveNotebookIntoView(activeCircle)
  }, [])

  const setActive = ({ active, activePosition, clickedNav }) => {
    if (!setActiveDisabled || clickedNav) {
      setActiveCircle({ ...activeCircle, active, activePosition })
      if (clickedNav) {
        setSetActiveDisabled(clickedNav)
      }
      // Necessary to prevent the scroll event from being triggered
      // and resetting a higher ResourceListing as active when scrolled to
      // the bottom of the list. (As the clicked ResourceListing won't be
      // at the top of the viewport and the one that is would be set to active
      // right after the clicked ResourceListing is)
      setTimeout(() => setSetActiveDisabled(false), 1000)
    }
  }

  return (
    <ActiveListItemContext.Provider
      value={{
        activeCircle,
        setActiveCircle,
        setActive,
        setActiveDisabled,
        setSetActiveDisabled,
      }}
    >
      {children}
    </ActiveListItemContext.Provider>
  )
}
