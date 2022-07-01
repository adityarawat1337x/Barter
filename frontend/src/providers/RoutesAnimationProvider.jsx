import { AnimatePresence } from "framer-motion"
import { React, useState, useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import Dashboard from "../pages/Dashboard"
import Login from "../pages/Login"
import Register from "../pages/Register"
import FourZeroFour from "../pages/FourZeroFour"
import Trending from "../pages/Trending"
import Winner from "../pages/Winner"
import { io } from "socket.io-client"
import Main from "../pages/Main"

const RoutesAnimationProvider = () => {
  const location = useLocation()
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const s = io("http://localhost:5000")
    setSocket(s)
    return () => {
      s.disconnect()
    }
  }, [])

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route exact path="/" element={<Main socket={socket} />} />
        <Route exact path="/home" element={<Dashboard socket={socket} />} />
        <Route exact path="/trending" element={<Trending socket={socket} />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register role={0} />} />
        <Route exact path="/results" element={<Winner />} />
        <Route path="*" element={<FourZeroFour />} />
      </Routes>
    </AnimatePresence>
  )
}

export default RoutesAnimationProvider
