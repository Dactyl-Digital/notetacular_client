import React, { useState, useContext } from "react"

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
      removeNotification(key)
    }, 3000)
  }
  const removeNotification = keyToRemove =>
    setNotifications({ ...removeKeyFromObject(notifications, keyToRemove) })

  const removeKeyFromObject = (obj, keyToRemove) =>
    Object.keys(obj).reduce((acc, key) => {
      if (key !== keyToRemove) {
        acc[key] = obj[key]
      }
      return acc
    }, {})

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}
