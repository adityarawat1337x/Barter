import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import bidService from "./bidService"

const initialState = {
  bids: {
    sell: [],
    buy: [],
    all: [],
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

export const create = createAsyncThunk(
  "items/create",
  async (newItem, thunkAPI) => {
    try {
      //const response = await bidService.create(bid)
      return newItem
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

export const getUserItems = createAsyncThunk(
  "items/getUserItems",
  async (userId, thunkAPI) => {
    try {
      console.log(userId)
      return userId
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getUserBids = createAsyncThunk(
  "items/getUserBids",
  async (userId, thunkAPI) => {
    try {
      const response = await bidService.getUserBids(userId)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const updateBid = createAsyncThunk(
  "items/update",
  async (payload, thunkAPI) => {
    try {
      return payload
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

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
        state.bids.sell.push(action.payload)
        state.bids.all.push(action.payload)
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
        state.bids.all = action.payload
      })
      .addCase(getAllBids.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateBid.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.message = ""
      })
      .addCase(updateBid.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false

        let x = state
        //All BIDS
        let index = x.bids.all.findIndex(
          (element) => element._id === action.payload._id
        )
        x.bids.all[index] = action.payload
        //BUY SECTION
        index = x.bids.buy.findIndex(
          (element) => element._id === action.payload._id
        )
        console.log(action.payload.ownerId, action.payload.userId)
        if (action.payload.ownerId !== action.payload.userId)
          if (index === -1) {
            x.bids.buy.push(action.payload)
          } else {
            x.bids.buy[index] = action.payload
          }

        state = x
      })
      .addCase(updateBid.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getUserBids.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.message = ""
      })
      .addCase(getUserBids.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.bids.buy = action.payload
      })
      .addCase(getUserBids.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getUserItems.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.message = ""
      })
      .addCase(getUserItems.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        let x = state.bids.all
        let selling = []
        x.forEach((item) => {
          if (item.ownerId === action.payload) selling.push(item)
        })
        console.log(selling)
        state.bids.sell = selling
      })
      .addCase(getUserItems.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = bidSlice.actions
export default bidSlice.reducer
