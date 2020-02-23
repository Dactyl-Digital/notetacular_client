import React, { useState, useEffect } from "react"
import { useUi } from "../../../hooks/queries/useUi"
import ActiveListItemProvider from "./active-list-item-provider"

export const ScrollContext = React.createContext({
  scrollTop: 0,
  setActiveItemScrolledTo: () => {},
})

export function useScrollState() {
  return React.useContext(ScrollContext)
}

export default function ScrollProvider({ children, listId, fn }) {
  const { loading } = useUi()
  const [scrollTop, setScrollTop] = useState(0)

  let mainContent
  useEffect(() => {
    if (!mainContent) {
      mainContent = document.getElementById(listId)
    }

    const scrollHandler = handleScroll(mainContent)(fn)
    mainContent.addEventListener("scroll", scrollHandler)

    return () => {
      mainContent.removeEventListener("scroll", scrollHandler)
    }
  }, [])

  // NOTE: fn is the logic for loading in additional resource list items (Notebooks, SubCats, Topics, Notes)
  // for when the bottom of the list has been scrolled past.
  const handleScroll = mainContent => fn => e => {
    setScrollTop(mainContent.scrollTop)
    if (typeof fn !== "undefined") {
      fn(e)
    }
  }

  const setActiveItemScrolledTo = ({
    type,
    resourceType,
    setActiveDisabled,
    setActiveCircle,
    el,
    title,
    index,
  }) => {
    if (type === resourceType) return
    if (setActiveDisabled) return
    const elementTop = el.getBoundingClientRect().top
    if (elementTop > -60 && elementTop < 60) {
      setActiveCircle({ active: title, activePosition: index })
    }
  }

  return (
    <ScrollContext.Provider value={{ scrollTop, setActiveItemScrolledTo }}>
      <ActiveListItemProvider>{children}</ActiveListItemProvider>
    </ScrollContext.Provider>
  )
}
