import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import rootClient from "../../config/rootClient";

const initialState = {
  is_loading: false,
  error: false,
  error_message: null,
  totalPage: "",
  numberOfPage: "",
  closed_trips: [],
  closed_trip: {},
};

export const getClosedTrips = createAsyncThunk(
  "get-closed-trips",
  async (page, { rejectWithValue }) => {
    try {
      const response = await rootClient.get(
        `api/v1/admin/closed-trips?page=${page}`
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

// search closed trip----------->

export const searchClosedTrip = createAsyncThunk(
  "search-closed-trip",
  async (obj, { rejectWithValue }) => {
    const { key, value } = obj;
    try {
      const response = await rootClient.get(
        `api/v1/admin/closed-trips/${key}/${value}`
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const closedTripsSlice = createSlice({
  name: "closed-trips",
  initialState,
  reducers: {
    getClosedTripById(state, action) {
      state.closed_trip = state.closed_trips.find(
        (item) => item._id === action.payload
      );
    },
  },

  extraReducers: {
    // get all closed trip-------------------------------------------

    [getClosedTrips.fulfilled]: (state, action) => {
      state.closed_trips = action.payload.trips;
      state.totalPage = action.payload.total;
      state.numberOfPage = action.payload.numberOfPage;
      state.is_loading = false;
    },
    [getClosedTrips.rejected]: (state, action) => {
      state.is_loading = false;
      state.error = true;
      state.error_message = "Something Wrong";
    },
    [getClosedTrips.pending]: (state) => {
      state.is_loading = true;
    },

    // search close trips-----------------
    [searchClosedTrip.fulfilled]: (state, action) => {
      console.log(action.payload.trip);
      state.closed_trips = action.payload.trip;
      state.totalPage = action.payload.total;
      state.numberOfPage = action.payload.numberOfPage;
      state.is_loading = true;
    },
    [searchClosedTrip.pending]: (state, action) => {
      state.is_loading = true;
    },
    [searchClosedTrip.rejected]: (state, action) => {
      state.is_loading = false;
      state.error = true;
    },
  },
});

export const { getClosedTripById } = closedTripsSlice.actions;
export default closedTripsSlice.reducer;
