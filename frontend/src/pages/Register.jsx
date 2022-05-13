import {
  Input,
  Box,
  VStack,
  FormControl,
  FormLabel,
  Button,
  Spacer,
  Container,
  useColorModeValue,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"
import styled from "styled-components"
import AnimatedRouteWrapper from "../providers/AnimatedRouteWrapper"
import { register, reset } from "../feature/auth/authSlice"

const Register = (props) => {
  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const { name, email, password, confirmPassword } = form

  const bg = useColorModeValue("white", "gray.900")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  )
  if (user) console.log(user)

  const handleChange = (e) => {
    setform((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const submitForm = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
    } else {
      dispatch(register(form))
    }
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (!isLoading && (isSuccess || user)) {
      //toast.success("Sign Up Success")
      navigate("/")
    }

    dispatch(reset())
  }, [user, isError, isSuccess, isLoading, message, dispatch, navigate])

  return (
    <AnimatedRouteWrapper>
      <VStack overflow={"hidden"} h="100vh" align="center">
        <Spacer />

        <Container align="center" backgroundColor={bg} p="10" rounded="xl">
          <Main>Sign Up</Main>
          <VStack h="max-content" align="center" justify="center">
            <FormControl>
              <Form onSubmit={submitForm}>
                <FormLabel width="xs" htmlFor="name">
                  Full Name
                </FormLabel>
                <Input
                  width="xs"
                  variant="filled"
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  placeholder="John"
                  onChange={handleChange}
                  mb="3"
                />
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
                  mb="3"
                />
                <FormLabel width="xs" htmlFor="password">
                  Password
                </FormLabel>
                <Input
                  width="xs"
                  variant="filled"
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={handleChange}
                  mb="3"
                />
                <FormLabel width="xs" htmlFor="confirmPassword">
                  Confirm Password
                </FormLabel>
                <Input
                  width="xs"
                  variant="filled"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  mb="3"
                />
                <Spacer />
                <Button
                  isLoading={isLoading === true}
                  loadingText="Signing Up"
                  mt={5}
                  width="xs"
                  colorScheme="blue"
                  type="submit"
                >
                  Sign Up
                </Button>
                <Spacer />
                <span
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "lighter",
                    color: "gray",
                  }}
                >
                  Already have an account?
                </span>
                <Forgot to="/login"> Sign In</Forgot>
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
export default Register
