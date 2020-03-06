import React, { useState, useCallback, useContext } from "react"

const NotificationContext = React.createContext({
  notifications: {},
  addNotification: () => {},
})

export function useNotifications() {
  const { notifications, addNotification } = useContext(NotificationContext)
  return { notifications, addNotification }
}

export default function NotificationProvider({
  children,
  initialNotifications,
}) {
  const [notifications, setNotifications] = useState(initialNotifications)

  // NOTE:
  // notification should be an object w/ keys message and type
  const addNotification = ({ key, notification }) => {
    setNotifications({ ...notifications, [key]: notification })
    setTimeout(() => {
      removeNotifications()
    }, 3000)
  }

  const removeNotifications = useCallback(() =>
    setNotifications(
      notifications => {
        console.log(
          "The notications in the removeNots callback: ",
          notifications
        )
        const result = removeTimeElapsedNotifications(notifications)
        console.log("setting notifications: ", result)
        return { ...result }
      },
      [setNotifications]
    )
  )

  const removeTimeElapsedNotifications = notifications =>
    Object.keys(notifications).reduce((acc, key) => {
      if (Date.now() - notifications[key].notifiedAt < 3000) {
        acc[key] = notifications[key]
      }
      return acc
    }, {})

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}
