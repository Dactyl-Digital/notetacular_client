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
    notification: { message: error.message, type: "ERROR" },
  })
  toggleShowModal(false)
}
