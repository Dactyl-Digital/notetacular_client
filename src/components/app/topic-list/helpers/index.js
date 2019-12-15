export const formatTime = number => {
  if (number === 60) return `1:00`
  if (number > 60) {
    let seconds = number % 60
    let minutes = (number - seconds) / 60
    let hours
    if (minutes > 60) {
      hours = minutes / 60
      minutes = minutes - hours * 60
    }
    // const minutes = strNum.slice(0, strNum.length - 2)
    // const seconds = strNum.slice(strNum.length - 2)
    if (hours) {
      return `${hours}:${minutes}:${seconds}`
    } else {
      return `${minutes}:${
        String(seconds).length === 1 ? "0" + seconds : seconds
      }`
    }
  }
  const strNum = String(number)
  if (strNum.length === 1) {
    return `0:0${strNum}`
  }
  if (strNum.length === 2) {
    return `0:${strNum}`
  }
}
