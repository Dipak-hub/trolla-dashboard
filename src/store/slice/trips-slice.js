import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import rootClient from "../../config/rootClient";

const initialState = {
  is_loading: false,
  search: false,
  error_message: null,
  totalPage: "",
  numberOfPage: "",
  trips: [],
  trip: {},
};

// get all trip--------------------
export const getTrips = createAsyncThunk(
  "get-trips",
  async (page, { rejectWithValue }) => {
    try {
      const response = await rootClient.get(`api/v1/admin/trips?page=${page}`);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

// search completed trip-------->
export const searchTrip = createAsyncThunk(
  "search-trip",
  async (obj, { rejectWithValue }) => {
    const { key, value } = obj;
    try {
      const response = await rootClient.get(
        `api/v1/admin/trips/${key}/${value}`
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

// all trips  status change update-------------
export const tripsChangeStatus = createAsyncThunk(
  "update-trips-status",
  async (data, { rejectWithValue }) => {
    const { id, status } = data;
    try {
      const response = await rootClient.put(`api/v1/admin/trips/${id}`, {
        status,
      });
      return data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

const tripsSlice = createSlice({
  name: "all-trips",
  initialState,
  reducers: {
    getTripById(state, action) {
      state.trip = state.trips.find((item) => item._id === action.payload);
    },
  },
  extraReducers: {
    [getTrips.fulfilled]: (state, action) => {
      state.trips = action.payload?.trips;
      state.totalPage = action.payload?.total;
      state.numberOfPage = action.payload?.numberOfPage;
      state.is_loading = false;
    },
    [getTrips.pending]: (state, action) => {
      state.is_loading = true;
    },
    [getTrips.rejected]: (state, action) => {
      state.is_loading = false;
      state.error = true;
    },

    // search ----
    [searchTrip.fulfilled]: (state, action) => {
      state.trips = action.payload.trip;
      state.search = true;
      state.totalPage = action.payload.total;
      state.numberOfPage = action.payload.numberOfPage;
      state.is_loading = false;
    },
    [searchTrip.pending]: (state, action) => {
      state.is_loading = true;
      state.search = false;
    },
    [searchTrip.rejected]: (state, action) => {
      state.is_loading = false;
      state.search = false;
      state.error = true;
    },

    // change  status  --------------------------------------
    [tripsChangeStatus.fulfilled]: (state, action) => {
      const { id, status } = action.payload;
      state.trips = state.trips.map((item) =>
        item._id === id ? { ...item, status } : item
      );
      state.trip = { ...state.trip, status };
    },
  },
});

export const { getTripById } = tripsSlice.actions;
export default tripsSlice.reducer;
