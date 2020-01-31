export const onResourceLoadScrollIntoView = id => {
  setTimeout(() => {
    let targetResource = document.getElementById(id)
    // NOTE: scrollIntoView worked.... AND I'm willing to settle with that for now!
    // TODO: CLean this shiz up, uninstall gsap, and add hover style to focused element
    // manage that state -> i.e. it should become the active div, until user scrolls
    // then other divs will be newly selected active divs.
    if (targetResource) {
      targetResource.scrollIntoView()
    } else {
      onResourceLoadScrollIntoView(id)
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
