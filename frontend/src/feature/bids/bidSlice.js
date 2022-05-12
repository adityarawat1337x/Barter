import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import bidService from "./bidService"

const initialState = {
  bids: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

export const create = createAsyncThunk(
  "items/create",
  async (bid, thunkAPI) => {
    try {
      const response = await bidService.create(bid)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getAllBids = createAsyncThunk("items/getAll", async (thunkAPI) => {
  try {
    const response = await bidService.getAll()
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const bidSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(create.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.message = ""
      })
      .addCase(create.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.bids.push(action.payload)
      })
      .addCase(create.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAllBids.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.message = ""
      })
      .addCase(getAllBids.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.bids = action.payload
      })
      .addCase(getAllBids.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = bidSlice.actions
export default bidSlice.reducer
