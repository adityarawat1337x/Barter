import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { logout, reset } from "../feature/auth/authSlice"
import {
  Flex,
  Spacer,
  Box,
  useColorMode,
  Button,
  HStack,
} from "@chakra-ui/react"
import { IconButton } from "@chakra-ui/button"
import { Image } from "@chakra-ui/react"
import { BsMoonFill } from "react-icons/bs"
import { FaSun } from "react-icons/fa"
import styled from "styled-components"
import logo from "../assets/logo.svg"

const Header = () => {
  const { user } = useSelector((state) => state.auth)
  const { colorMode, toggleColorMode } = useColorMode()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <Navbar
      pl="20"
      pr="20"
      mt="5"
      position="absolute"
      top="0"
      left="0"
      w="100%"
      align="center"
    >
      <Main>
        <Link to="/">
          <Image
            filter={colorMode === "dark" ? "invert(100%)" : "invert(0%)"}
            boxSize="60px"
            objectFit="cover"
            src={logo}
          ></Image>
        </Link>
      </Main>
      <Spacer />
      <Sub spacing="3">
        {user ? (
          <Button
            variant="ghost"
            onClick={() => {
              navigate("/login")
              dispatch(logout()).then(() => dispatch(reset()))
              toast.success("Logged Out")
            }}
          >
            logout
          </Button>
        ) : (
          <>
            <Button size="sm" variant="solid" colorScheme="green">
              <Link to="/login">Login</Link>
            </Button>
            <Button size="sm" variant="solid" colorScheme="messenger">
              <Link to="/register">SignUp</Link>
            </Button>
          </>
        )}
        <Spacer />
        <IconButton
          aria-label="aria-label"
          icon={colorMode === "dark" ? <FaSun /> : <BsMoonFill />}
          onClick={toggleColorMode}
          isRound={true}
          size="sm"
        ></IconButton>
      </Sub>
    </Navbar>
  )
}

const Navbar = styled(Flex)`
  font-size: 1.2rem;
`
const Main = styled(Box)`
  font-size: 1.5rem;
  align-items: center;
  justify-content: center;
`
const Sub = styled(HStack)``
export default Header
