export const checkProperty = ({
  obj,
  property,
  successFn,
  failFn,
  recursiveFn,
}) =>
  obj.hasOwnProperty(property)
    ? typeof recursiveFn === "function"
      ? recursiveFn(obj[property])
      : successFn()
    : failFn()

export const checkStorageExpiry = item => {
  if (typeof localStorage !== "undefined") {
    if (localStorage.hasOwnProperty("storageExpiry")) {
      const expiry = localStorage.getItem("storageExpiry")
      console.log("the expiry: ", expiry)
      console.dir(expiry)
      console.log("expiry < Date.now()")
      console.log(expiry < Date.now())
      return expiry < Date.now() ? null : localStorage.getItem(item)
    }
    return null
  }
}
