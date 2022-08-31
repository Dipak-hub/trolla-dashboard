import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import storage from "redux-persist/lib/storage";

import rootClient from "../../config/rootClient";

const initialState = {
  is_loading: false,
  login: false,
  error_message: null,
  user: {},
  online_users: [{}],
};

export const login = createAsyncThunk(
  "user-login",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://dashboard.trollaexpress.com//api/v1/login",user)
      // console.log(response.data.user);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "user-logout",
  async (a, { rejectWithValue }) => {
    try {
      const response = await rootClient.post("api/v1/logout");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOnlineUsers = createAsyncThunk(
  "get-online-users",
  async (a, { rejectWithValue }) => {
    try {
      const response = await rootClient.get("api/v1/admin/online-users");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.login = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.is_loading = false;
      state.error_message = "Wrong email and password ";
    },
    [login.pending]: (state) => {
      state.is_loading = true;
    },
    // logout ---------------------------------------------
    [logout.fulfilled]: (state, action) => {
      state.login = false;
    },
    [logout.rejected]: (state, action) => {
      state.is_loading = false;
    },
    [logout.pending]: (state) => {
      state.is_loading = true;
    },
    // online users  ---------------------------------------------
    [getOnlineUsers.fulfilled]: (state, action) => {
      state.online_users = action.payload;
    },
    [getOnlineUsers.rejected]: (state, action) => {
      state.is_loading = false;
    },
    [getOnlineUsers.pending]: (state) => {
      state.is_loading = true;
    },
  },
});
// export const { logout } = userSlice.actions;
export default usersSlice.reducer;
