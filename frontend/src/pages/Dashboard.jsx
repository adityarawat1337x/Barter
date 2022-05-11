import {
  Button,
  HStack,
  VStack,
  Heading,
  Spacer,
  Input,
  IconButton,
  Box,
} from "@chakra-ui/react"
import { React, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {
  createTask,
  getTasks,
  reset,
  deleteTask,
} from "../feature/task/taskSlice"
import AnimatedRouteWrapper from "../providers/AnimatedRouteWrapper"
import { AiFillDelete } from "react-icons/ai"

const Dashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const { user, isLoading } = useSelector((state) => state.auth)
  const [newTask, setnewTask] = useState("")
  const { tasks } = useSelector((state) => state.task)

  const handleChange = (e) => {
    setnewTask(e.target.value)
  }

  useEffect(() => {
    if (!user && !isLoading && location.pathname === "/") {
      toast.error("You must be logged in to view this page")
      navigate("/login")
    }
    if (tasks) console.log(tasks)

    dispatch(reset())
  }, [user, isLoading, location, dispatch, tasks, navigate])

  return (
    <AnimatedRouteWrapper>
      <VStack h="100vh">
        <Spacer />
        <Heading>Dashboard</Heading>
        <Spacer />
        {tasks ? (
          tasks.map((task) => (
            <HStack>
              <Box>{task.task}</Box>
              <Spacer />
              <IconButton
                isRound={true}
                colorScheme="red"
                icon={<AiFillDelete />}
                onClick={() => dispatch(deleteTask(task._id))}
              />
            </HStack>
          ))
        ) : (
          <></>
        )}
        <Spacer />
        <Button onClick={() => dispatch(getTasks(user))}>Get All Tasks</Button>
        <Spacer />
        <Input
          width="xs"
          variant="filled"
          type="text"
          id="email"
          name="email"
          value={newTask}
          placeholder="JohnDoe@gmail.com"
          onChange={handleChange}
          mb="5"
        />
        <Button
          onClick={() =>
            dispatch(createTask({ user, task: newTask })).then(() =>
              setnewTask("")
            )
          }
        >
          Add Task
        </Button>
        <Spacer />
      </VStack>
    </AnimatedRouteWrapper>
  )
}

export default Dashboard
