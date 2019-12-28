import React, { useEffect } from "react"
import { navigate } from "gatsby"
import { useAuth } from "../../hooks/queries/useAuth"
import { useNotebook } from "../../hooks/queries/useNotebook"
import { useSubCategory } from "../../hooks/queries/useSubCategory"
import { useTopic } from "../../hooks/queries/useTopic"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const { authenticated } = useAuth()
  const {
    listNotebooksOffset,
    notebooks,
    notebooksPaginationEnd,
  } = useNotebook()
  const { parentNotebooksOfSubCategories } = useSubCategory()
  const { parentSubCategoriesOfTopics } = useTopic()
  useEffect(() => {
    // set up window leave listener which will be the hook
    // for saving reduxState to localStorage
    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", handleSaveReduxState)
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("beforeunload", handleSaveReduxState)
      }
    }
    // Due to closure.... The beforeunload eventListener needs to be re-registered in order to read the updated reduxState
    // TODO: Determine if having this logic here will be negative for performance...
  }, [
    listNotebooksOffset,
    notebooks,
    notebooksPaginationEnd,
    parentNotebooksOfSubCategories,
    parentSubCategoriesOfTopics,
  ])

  // TODO: Add a time expiry for the state persisted to localstorage
  // to be refreshed/rejected from being hydrated into redux state.
  const handleSaveReduxState = () => {
    // localStorage.setItem(
    //   "listNotebooksOffset",
    //   JSON.stringify(listNotebooksOffset)
    // )
    // localStorage.setItem("notebooks", JSON.stringify(notebooks))
    // localStorage.setItem(
    //   "notebooksPaginationEnd",
    //   JSON.stringify(notebooksPaginationEnd)
    // )
    // localStorage.setItem(
    //   "parentNotebooksOfSubCategories",
    //   JSON.stringify(parentNotebooksOfSubCategories)
    // )
    // localStorage.setItem(
    //   "parentSubCategoriesOfTopics",
    //   JSON.stringify(parentSubCategoriesOfTopics)
    // )
  }

  if (!authenticated && location.pathname !== `/app/login`) {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("authenticated")
    }
    navigate("/app/login")
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute
