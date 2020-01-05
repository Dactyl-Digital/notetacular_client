import React, { useEffect } from "react"
import { navigate } from "gatsby"
import { useAuth } from "../../hooks/queries/useAuth"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const { authenticated } = useAuth()

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
