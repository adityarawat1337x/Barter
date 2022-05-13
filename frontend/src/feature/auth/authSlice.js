import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "./authService"

//? Get user data from localstorage
const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

//Register user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const response = await authService.register(user)
      return response
    } catch (error) {
      const message =
        (error &&
          error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.error ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//? Logout user

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout()
})

//? login user

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const response = await authService.login(user)
    return response
  } catch (error) {
    const message =
      (error &&
        error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.error ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//? get user

export const getUser = createAsyncThunk("auth/get", async (user, thunkAPI) => {
  try {
    const response = await authService.getUser(user)
    return response
  } catch (error) {
    const message =
      (error &&
        error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.error ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
