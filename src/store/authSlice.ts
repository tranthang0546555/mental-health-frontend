import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LOGIN_EMAIL_PASSWORD, USER_PROFILE, useApi } from "../api";
import { LocalStorageKey } from "../constants";

export const login = createAsyncThunk(
  "auth/login",
  async (data: LoginInputs) => {
    const response = await useApi(LOGIN_EMAIL_PASSWORD, {
      data: data,
      method: "POST",
    });
    return response.data;
  }
);

export const getProfile = createAsyncThunk("auth/profile", async () => {
  const response = await useApi.get(USER_PROFILE);
  return response.data;
});

type AuthState = {
  login: boolean;
  accessToken: string;
  user?: User & Doctor;
};

const initialState: AuthState = {
  login: false,
  accessToken: localStorage.getItem(LocalStorageKey.ACCESS_TOKEN) || "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      location.reload();
      localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, "");
    },
  },
  extraReducers(builder) {
    builder: {
      builder.addCase(login.fulfilled, (state, action) => {
        state.login = true;
        const token = action.payload.accessToken;
        state.accessToken = token;
        localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, token);
        location.assign("/dashboard");
      });
      builder.addCase(login.rejected, (state, action) => {
        console.log(action);
        // TODO catch error
      });
      builder.addCase(getProfile.fulfilled, (state, action) => {
        state.login = true;
        state.user = action.payload;
      });
    }
  },
});
export const { logOut } = authSlice.actions;
export default authSlice.reducer;
