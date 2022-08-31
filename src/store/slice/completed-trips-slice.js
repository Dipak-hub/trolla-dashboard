import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import rootClient from "../../config/rootClient";

const initialState = {
  is_loading: false,
  error: false,
  error_message: null,
  totalPage: "",
  numberOfPage: "",
  completed_trips: [],
  completed_trip: {},
};

// get All Booking Complete trip-------------------

export const getCompletedTrips = createAsyncThunk(
  "get-completed-trips",
  async (page, { rejectWithValue }) => {
    try {
      const response = await rootClient.get(
        `api/v1/admin/completed-trips?page=${page}`
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

// search completed trip-------->
export const searchCompletedTrip = createAsyncThunk(
  "search-completed-trip",
  async (obj, { rejectWithValue }) => {
    const { key, value } = obj;
    try {
      const response = await rootClient.get(
        `api/v1/admin/completed-trips/${key}/${value}`
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

// Delete Completed trip----------------------------

export const deleteCompletedTrips = createAsyncThunk(
  "delete-completed-trips",
  async (id, { rejectWithValue }) => {
    try {
      const response = await rootClient.delete(
        `api/v1/admin/completed-trips/${id}`
      );
      return id;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const completedTripsSlice = createSlice({
  name: "completed-trips",
  initialState,
  reducers: {
    getCompletedTripById(state, action) {
      state.completed_trip = state.completed_trips.find(
        (item) => item._id === action.payload
      );
    },
  },

  extraReducers: {
    // get Confirmed trips-------------------------------------------
    [getCompletedTrips.fulfilled]: (state, action) => {
      state.completed_trips = action.payload.trips;
      state.totalPage = action.payload.total;
      state.numberOfPage = action.payload.numberOfPage;
      state.is_loading = false;
    },
    [getCompletedTrips.rejected]: (state, action) => {
      state.is_loading = false;
      state.error_message = "Something Wrong";
    },
    [getCompletedTrips.pending]: (state) => {
      state.is_loading = true;
    },

    // delete completed trips --------------------------------------
    [deleteCompletedTrips.fulfilled]: (state, { payload: id }) => {
      state.completed_trip = state.completed_trips.filter(
        (item) => item._id !== id
      );
    },

    [deleteCompletedTrips.rejected]: (state, action) => {
      state.error_message = true;
      state.is_loading = false;
    },

    [searchCompletedTrip.fulfilled]: (state, action) => {
      state.completed_trips = action.payload.trip;
      state.totalPage = action.payload.total;
      state.numberOfPage = action.payload.numberOfPage;
      state.is_loading = false;
    },
    [searchCompletedTrip.pending]: (state, action) => {
      state.is_loading = true;
    },
    [searchCompletedTrip.rejected]: (state, action) => {
      state.is_loading = false;
      state.error_message = "Something Wrong";
    },

    // change booking update  --------------------------------------

    // [updateConfirm.fulfilled]: (state, action) => {
    //   const { id, status } = action.payload;

    //   state.confirms = state.confirms.map((item) =>
    //     item._id === id ? { ...item, status } : item
    //   );
    //   state.confirms = { ...state.confirms, status };
    // },

    // [updateConfirm.rejected]: (state, action) => {
    //   state.errorMessage = true;
    //   state.isloading = false;
    // },
  },
});

export const { getCompletedTripById } = completedTripsSlice.actions;
export default completedTripsSlice.reducer;
