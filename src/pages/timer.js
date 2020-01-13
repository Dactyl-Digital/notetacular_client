import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import Navbar from "../components/index/navbar"

// TODO: Add a isLoggedIn check on this page
// to determine if redirection to /app/ is necessary

const TimerPage = () => {
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)

  const timer = time =>
    setTimeout(() => {
      setTime(time + 1)
    }, 1000)

  useEffect(() => {
    if (running) {
      timer(time)
    }

    return () => {
      clearTimeout(timer)
    }
  }, [running, time])

  // const startTimer = () => {

  // }

  // const stopTimer = () => {
  //   clearInterval(timer)
  // }

  const toggleRunning = () => {
    // if (!running) {
    //   startTimer()
    // } else {
    //   stopTimer()
    // }
    setRunning(!running)
  }

  return (
    <Layout>
      <Navbar></Navbar>
      <h1>{time}</h1>
      <button onClick={toggleRunning}>{!running ? "Start" : "Stop"}</button>
    </Layout>
  )
}

export default TimerPage
