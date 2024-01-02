import { toast } from 'react-toastify'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { LOGIN_EMAIL_PASSWORD, USER_PROFILE, useApi } from '../api'
import { LocalStorageKey } from '../constants'

export const login = createAsyncThunk('auth/login', async (data: LoginInputs, { rejectWithValue }) => {
  try {
    const response = await useApi(LOGIN_EMAIL_PASSWORD, {
      data: data,
      method: 'POST'
    })
    return response.data
  } catch (error: any) {
    return rejectWithValue(error?.response)
  }
})

export const getProfile = createAsyncThunk('auth/profile', async () => {
  const response = await useApi.get(USER_PROFILE)
  return response.data
})

type AuthState = {
  login: boolean
  accessToken: string
  user?: User & Doctor
}

const initialState: AuthState = {
  login: false,
  accessToken: localStorage.getItem(LocalStorageKey.ACCESS_TOKEN) || ''
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: () => {
      location.reload()
      localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, '')
    }
  },
  extraReducers(builder) {
    builder: {
      builder.addCase(login.fulfilled, (state, action) => {
        state.login = true
        const token = action.payload.accessToken
        state.accessToken = token
        localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, token)
        const searchParams = new URLSearchParams(location.search)
        const navigatePath = searchParams.get('navigate')
        if (navigatePath) location.assign('/' + navigatePath)
        else location.assign('/dashboard')
      })
      builder.addCase(login.rejected, (_, action) => {
        const payload: any = action.payload
        toast.error(payload?.data?.message)
      })
      builder.addCase(getProfile.fulfilled, (state, action) => {
        state.login = true
        state.user = action.payload
      })
      builder.addCase(getProfile.rejected, (state) => {
        state.login = false
        localStorage.removeItem(LocalStorageKey.ACCESS_TOKEN)
        // toast.error("Tài khoản của bạn đã bị cấm truy cập");
      })
    }
  }
})
export const { logOut } = authSlice.actions
export default authSlice.reducer
