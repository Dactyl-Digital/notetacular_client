import React from "react"

export const onResourceLoadScrollIntoView = (id, setSetActiveDisabled) => {
  setTimeout(() => {
    let targetResource = document.getElementById(id)
    // NOTE: scrollIntoView worked.... AND I'm willing to settle with that for now!
    // TODO: CLean this shiz up, uninstall gsap, and add hover style to focused element
    // manage that state -> i.e. it should become the active div, until user scrolls
    // then other divs will be newly selected active divs.
    if (targetResource) {
      // NOTE:
      // setSetActiveDisabled meant to prevent another
      // item from being set to active while scrolling to
      // the current activeItem when the page is initially loaded.

      // TODO: Maybe I'll get to this eventually..., it's a small
      // detail anyway.
      // For whatever reason setSetActiveDisabled ins't a function
      // in here... but whenever I log the typeof, it does say function.
      // if (typeof setSetActiveDisabled === "function") {
      // setSetActiveDisabled(true)
      //   setTimeout(() => {
      //     setSetActiveDisabled(false)
      //   }, 1000)
      // }
      targetResource.scrollIntoView()
    } else {
      onResourceLoadScrollIntoView(id, setSetActiveDisabled)
    }
  }, 500)
}

export const checkFormSubmissionErrors = ({
  error,
  notificationKey,
  addNotification,
  toggleShowModal,
  renderHtml,
}) => {
  if (error.hasOwnProperty("errors")) {
    return renderHtml(error.errors[0].message)
  }
  addNotification({
    key: notificationKey,
    notification: {
      message: error.message,
      type: "ERROR",
      notifiedAt: Date.now(),
    },
  })
  toggleShowModal(false)
}

export const renderAuthFormError = ({ field, errors, addNotification }) => {
  // First possible error format
  // errors: Array(3)
  //   0: {message: "Username must be between 4 and 40 characters.", field: "username"}
  //   1: {message: "Email must be greater than 8 characters.", field: "email"}
  //   2: {message: "Password must be at least 12 characters.", field: "password"}
  if (Array.isArray(errors)) {
    const result = errors.reduce((acc, error) => {
      if (error.field === field) {
        acc.push(<p className="input-error">{error.message}</p>)
      }
      return acc
    }, [])
    return result
  }

  // Second possible error format:
  // errors:
  //  username: ["That username is already taken"]
  if (errors.hasOwnProperty(field)) {
    return <p className="input-error">{errors[field][0]}</p>
  }

  return null
}

// Example usage of getNestedProperty:
// const obj = {a: {b: {c: "Great Success!"}}, d: 2}
// In a successful case:
// getNestedProperty(obj, ['a', 'b', 'c']) => "Great Success!"
// In an errpr case:
// getNestedProperty(obj, ['a', 'b', 'e']) => "PROPERTY_ACCESS_ERROR"
export const getNestedProperty = (
  obj,
  [key, ...keys],
  failVal = "PROPERTY_ACCESS_ERROR"
) => {
  if (keys.length === 0) {
    const val = obj[key]
    if (val === undefined) return failVal
    return val
  }
  const val = obj[key]
  if (val === undefined) return failVal
  return getNestedProperty(val, keys)
}
