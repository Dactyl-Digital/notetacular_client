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
