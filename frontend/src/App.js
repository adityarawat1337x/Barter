import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import { ChakraProvider } from "@chakra-ui/react"
import BackGroundProvider from "./providers/BackGroundProvider"
import RoutesAnimationProvider from "./providers/RoutesAnimationProvider"
import ToastProvider from "./providers/ToastProvider"
import SidebarWithHeader from "./components/Sidebar"
import { useSelector } from "react-redux"
import Header from "./components/Header"

const App = () => {
  const { user } = useSelector((state) => state.auth)
  return (
    <>
      <ChakraProvider>
        <BackGroundProvider>
          <Router>
            {user ? (
              <SidebarWithHeader>
                <RoutesAnimationProvider />
              </SidebarWithHeader>
            ) : (
              <>
                <RoutesAnimationProvider />
                <Header />
              </>
            )}
          </Router>
          <ToastProvider />
        </BackGroundProvider>
      </ChakraProvider>
    </>
  )
}

export default App
