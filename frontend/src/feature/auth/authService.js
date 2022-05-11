import axios from "axios"

const API_URL_REGISTER = "http://localhost:5000/register"
const API_URL_ADMIN_REGISTER = "http://localhost:5000/admin/register"
const API_URL_LOGIN = "http://localhost:5000/login"

//? Register User

const register = async (user) => {
  let api = user.role > 0 ? API_URL_ADMIN_REGISTER : API_URL_REGISTER
  const response = await axios.post(api, user)
  if (response.data) localStorage.setItem("user", JSON.stringify(response.data))
  return response.data
}

//? login user

const login = async (user) => {
  const response = await axios.post(API_URL_LOGIN, user)
  if (response.data) localStorage.setItem("user", JSON.stringify(response.data))
  return response.data
}

//? logout user
const logout = async () => {
  localStorage.removeItem("user")
}

const authService = {
  register,
  logout,
  login,
}
export default authService
