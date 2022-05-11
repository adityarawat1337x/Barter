import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../feature/auth/authSlice"
import taskReducer from "../feature/task/taskSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
  },
})
