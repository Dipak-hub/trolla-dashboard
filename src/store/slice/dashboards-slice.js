/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// import axios from "axios";
import rootClient from "../../config/rootClient";

const initialState = {
  is_loading: false,
  error: false,
  error_message: null,
  info: {},
};

// get count-------
export const getInfo = createAsyncThunk(
  "get-info",
  async (a, { rejectWithValue }) => {
    try {
      const response = await rootClient.get("api/v1/admin/info");
      // console.log(response.data.info);
      return response.data.info;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const dashboardsSlice = createSlice({
  name: "dashboards",
  initialState,
  reducers: {
    // getCount(state, action) {
    //   getLoadCount(), getLoadCount();
    // },
  },

  extraReducers: {
    // get loader count -------------------------------------------
    [getInfo.fulfilled]: (state, action) => {
      // console.log("first", action.payload);
      state.info = action.payload;
      state.is_loading = false;
    },
    [getInfo.rejected]: (state, action) => {
      state.is_loading = false;
      state.error_message = "Something Wrong";
    },
    [getInfo.pending]: (state) => {
      state.is_loading = true;
    },
  },
});
export const {} = dashboardsSlice.actions;
export default dashboardsSlice.reducer;
