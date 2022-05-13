import { AnimatePresence } from "framer-motion"
import React from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import Dashboard from "../pages/Dashboard"
import Login from "../pages/Login"
import Register from "../pages/Register"
import FourZeroFour from "../pages/FourZeroFour"

const RoutesAnimationProvider = () => {
  const location = useLocation()
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register role={0} />} />
        <Route path="*" element={<FourZeroFour />} />
      </Routes>
    </AnimatePresence>
  )
}

export default RoutesAnimationProvider
