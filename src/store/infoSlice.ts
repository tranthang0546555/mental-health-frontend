import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HOME_SYSTEM_INFO, useApi } from '../api'

export const countsInfo = createAsyncThunk('info/count', async () => {
  const defaultTheme = localStorage.getItem('theme')
  let url = HOME_SYSTEM_INFO
  if (!defaultTheme) url += '?newUser=true'
  const response = await useApi(url)
  return response.data
})

const initialState: {
  counts?: CountsInfo
} = {}

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder: {
      builder.addCase(countsInfo.fulfilled, (state, action) => {
        state.counts = action.payload
      })
      builder.addCase(countsInfo.rejected, () => {
        // TODO catch error
      })
    }
  }
})

export default infoSlice.reducer
