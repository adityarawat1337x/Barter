import axios from "axios"

const API_URL = "http://localhost:5000/api/task/"

const getTasks = async (user) => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${user.token}` },
  })
  return response.data
}

const createTask = async (data) => {
  console.log("create task data: ", data.user.token, data.task)
  console.log("<--------->")
  const response = await axios.post(
    API_URL,
    { task: data.task },
    {
      headers: { Authorization: `Bearer ${data.user.token}` },
    }
  )
  return response.data
}

const updateTask = async (user, id, task) => {
  const response = await axios.put(API_URL + id, {
    headers: { Authorization: `Bearer ${user.token}` },
    body: { task },
  })
  return response.data
}

const deleteTask = async (token, id) => {
  console.log("delete task data: ", token)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(API_URL + id, config)
  return response.data
}

const taskService = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
}

export default taskService
