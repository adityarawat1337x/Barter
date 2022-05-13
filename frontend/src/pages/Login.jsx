import {
  Input,
  Box,
  VStack,
  FormControl,
  FormLabel,
  Button,
  Spacer,
  HStack,
  Container,
  useColorModeValue,
} from "@chakra-ui/react"
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import styled from "styled-components"
import AnimatedRouteWrapper from "../providers/AnimatedRouteWrapper"
import { reset, login } from "../feature/auth/authSlice"

const Login = () => {
  const [form, setform] = useState({
    email: "",
    password: "",
  })

  //const bg = useColorModeValue("rgba(255,255,255,0.5)", "rgba(82,82,88,0.6)")
  const bg = useColorModeValue("white", "gray.900")
  const { email, password } = form

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  const handleChange = (e) => {
    setform((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const submitForm = (e) => {
    e.preventDefault()
    dispatch(login(form))
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (!isLoading && (isSuccess || user)) {
      //toast.success("Logged In")
      navigate("/")
    }

    dispatch(reset())
  }, [user, isError, isSuccess, isLoading, message, dispatch, navigate])

  return (
    <AnimatedRouteWrapper>
      <VStack overflow={"hidden"} height="100vh">
        <Spacer />
        <Container align="center" backgroundColor={bg} p="10" rounded="xl">
          <Main>Sign In</Main>
          <VStack>
            <Spacer />
            <FormControl>
              <Form onSubmit={submitForm}>
                <FormLabel width="xs" htmlFor="email">
                  Email address
                </FormLabel>
                <Input
                  width="xs"
                  variant="filled"
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="JohnDoe@gmail.com"
                  onChange={handleChange}
                  mb="5"
                />
                <HStack width="xs" align="centre" justify="space-between">
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Forgot to="/register">Forgot Password?</Forgot>
                </HStack>
                <Input
                  width="xs"
                  variant="filled"
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={handleChange}
                  mb="5"
                />
                <Spacer />
                <Button
                  isLoading={isLoading === true}
                  loadingText="Signing In"
                  mt={5}
                  width="xs"
                  colorScheme="green"
                  type="submit"
                >
                  Sign In
                </Button>
                <Spacer />
                <span
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "lighter",
                    color: "gray",
                  }}
                >
                  Don't have an account?
                </span>
                <Forgot to="/register"> Sign Up</Forgot>
              </Form>
            </FormControl>
          </VStack>
        </Container>
        <Spacer />
      </VStack>
    </AnimatedRouteWrapper>
  )
}
const Main = styled(Box)`
  font-size: 1.6rem;
  font-weight: bold;
`
const Form = styled.form`
  font-size: 1.6rem;
  font-weight: bold;
`

const Forgot = styled(Link)`
  font-size: 0.9rem;
  color: #1e8ff4;
  font-family: sans-serif;
  font-weight: 200;
`
export default Login
