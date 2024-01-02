import { createSlice } from '@reduxjs/toolkit'

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    isLoading: false
  },
  reducers: {
    addLoading: (state) => {
      state.isLoading = true
    },
    removeLoading: (state) => {
      state.isLoading = false
    }
  }
})
export const { addLoading, removeLoading } = loadingSlice.actions
export default loadingSlice.reducer
