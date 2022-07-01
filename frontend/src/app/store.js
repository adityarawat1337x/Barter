import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../feature/auth/authSlice"
import bidsReducer from "../feature/bids/bidSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    items: bidsReducer,
  },
})
