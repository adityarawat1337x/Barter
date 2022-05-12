import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../feature/auth/authSlice"
import taskReducer from "../feature/task/taskSlice"
import bidsReducer from "../feature/bids/bidSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
    items: bidsReducer,
  },
})
