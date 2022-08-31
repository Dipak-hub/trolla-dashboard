import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import rootClient from "../../config/rootClient";

const initialState = {
  is_loading: false,
  error: false,
  error_message: null,
  totalPage: "",
  numberOfPage: "",
  pending_trips: [],
  pending_trip: {},
};

// get All Quotes-------------------

export const getQuotes = createAsyncThunk(
  "get-quotes",
  async (page, { rejectWithValue }) => {
    try {
      const response = await rootClient.get(
        `api/v1/admin/pending-trips?page=${page}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// search Quotation------------->
export const searchQuote = createAsyncThunk(
  "search-quote",
  async (obj, { rejectWithValue }) => {
    const { key, value } = obj;
    try {
      const response = await rootClient.get(
        `api/v1/admin/pending-trips/${key}/${value}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete Quotes----------------------------

export const deleteQuotes = createAsyncThunk(
  "delete-quotes",
  async (id, { rejectWithValue }) => {
    try {
      const response = await rootClient.delete(
        `api/v1/admin/pending-trips/${id}`
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const pendingTripsSlice = createSlice({
  name: "pending-trips",
  initialState,
  reducers: {
    getPendingTripsById(state, action) {
      state.pending_trip = state.pending_trips.find(
        (item) => item._id === action.payload
      );
    },
  },

  extraReducers: {
    // get Quote-------------------------------------------
    [getQuotes.fulfilled]: (state, action) => {
      state.pending_trips = action.payload.trips;
      state.totalPage = action.payload.total;
      state.numberOfPage = action.payload.numberOfPage;
      state.is_loading = false;
    },
    [getQuotes.pending]: (state) => {
      state.is_loading = true;
    },
    [getQuotes.rejected]: (state, action) => {
      state.is_loading = false;
    },

    // // delete Quotation --------------------------------------
    [deleteQuotes.fulfilled]: (state, { payload: id }) => {
      state.pending_trips = state.pending_trips.filter(
        (item) => item._id !== id
      );
      state.is_loading = false;
    },

    [deleteQuotes.pending]: (state, action) => {
      state.is_loading = true;
    },
    [deleteQuotes.rejected]: (state, action) => {
      state.is_loading = false;
    },

    // search quote------------
    [searchQuote.fulfilled]: (state, action) => {
      state.pending_trips = action.payload.trip;
      state.totalPage = action.payload.total;
      state.numberOfPage = action.payload.numberOfPage;
      state.is_loading = false;
    },
    [searchQuote.pending]: (state, action) => {
      state.is_loading = true;
    },
    [searchQuote.rejected]: (state, action) => {
      state.is_loading = false;
    },
  },
});

export const { getPendingTripsById } = pendingTripsSlice.actions;
export default pendingTripsSlice.reducer;
