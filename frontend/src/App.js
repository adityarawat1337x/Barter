import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import Header from "./components/Header"
import "react-toastify/dist/ReactToastify.css"
import { ChakraProvider } from "@chakra-ui/react"
import BackGroundProvider from "./providers/BackGroundProvider"
import RoutesAnimationProvider from "./providers/RoutesAnimationProvider"
import ToastProvider from "./providers/ToastProvider"

const App = () => {
  return (
    <>
      <ChakraProvider>
        <BackGroundProvider>
          <Router>
            <RoutesAnimationProvider />
            <Header />
          </Router>
          <ToastProvider />
        </BackGroundProvider>
      </ChakraProvider>
    </>
  )
}

export default App
