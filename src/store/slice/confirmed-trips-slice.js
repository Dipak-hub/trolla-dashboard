import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import rootClient from "../../config/rootClient";

const initialState = {
  is_loading: false,
  e_way_bill_loading: false,
  weight_slip_loading: false,
  load_receipt_loading: false,
  invoice_loading: false,
  error: false,
  error_message: null,
  totalPage: "",
  numberOfPage: "",
  confirmed_trips: [],
  confirmed_trip: {
    documents: {
      e_way_bill: "",
      weight_slip: "",
      load_receipt: "",
      invoice: "",
    },
  },
};

// get All Booking Confirm-------------------

export const getConfirmedTrips = createAsyncThunk(
  "get-confirmed-trips",
  async (page, { rejectWithValue }) => {
    try {
      const response = await rootClient.get(
        `api/v1/admin/confirmed-trips?page=${page}`
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

// search confirmed trips------------>

export const searchConfirmedTrip = createAsyncThunk(
  "search-confirmed-trip",
  async (obj, { rejectWithValue }) => {
    const { key, value } = obj;
    try {
      const response = await rootClient.get(
        `api/v1/admin/confirmed-trips/${key}/${value}`
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

// E-Way Bill Uploader------------------
export const uploadEWayBill = createAsyncThunk(
  "upload-e-way-bill",
  async (data, { getState, rejectWithValue }) => {
    const { confirmed_trips } = getState();
    const id = confirmed_trips.confirmed_trip._id;
    const formData = new FormData();
    formData.append("image", data);

    try {
      const response = await rootClient.post(
        `/api/v1/admin/confirmed-trips/e-way-bill/${id}`,
        formData,
        {
          headers: {
            accept: "application/json",
            "content-type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// E-Way Bill Uploader------------------
export const uploadWeightSlip = createAsyncThunk(
  "upload-weight-slip",
  async (data, { getState, rejectWithValue }) => {
    const { confirmed_trips } = getState();
    const id = confirmed_trips.confirmed_trip._id;

    const formData = new FormData();
    formData.append("image", data);
    try {
      const response = await rootClient.post(
        `/api/v1/admin/confirmed-trips/weight-slip/${id}`,
        formData,
        {
          headers: {
            accept: "application/json",
            "content-type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Load Receipt Uploader------------------
export const uploadLoadReceipt = createAsyncThunk(
  "upload-load-receipt",
  async (data, { getState, rejectWithValue }) => {
    const { confirmed_trips } = getState();
    const id = confirmed_trips.confirmed_trip._id;

    const formData = new FormData();
    formData.append("image", data);

    try {
      const response = await rootClient.post(
        `/api/v1/admin/confirmed-trips/load-receipt/${id}`,
        formData,
        {
          headers: {
            accept: "application/json",
            "content-type": "multipart/form-data",
          },
        }
      );
      return response.data.upload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// invoice Uploader------------------
export const uploadInvoice = createAsyncThunk(
  "upload-invoice",
  async (data, { getState, rejectWithValue }) => {
    const { confirmed_trips } = getState();
    const id = confirmed_trips.confirmed_trip._id;

    const formData = new FormData();
    formData.append("image", data);

    try {
      const response = await rootClient.post(
        `/api/v1/admin/confirmed-trips/invoice/${id}`,
        formData,
        {
          headers: {
            accept: "application/json",
            "content-type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const confirmedTripsSlice = createSlice({
  name: "confirmed_trips",
  initialState,
  reducers: {
    getConfirmedTripById(state, action) {
      state.confirmed_trip = state.confirmed_trips.find(
        (item) => item._id === action.payload
      );
    },
  },

  extraReducers: {
    // get Booking Confirm-------------------------------------------
    [getConfirmedTrips.fulfilled]: (state, action) => {
      state.confirmed_trips = action.payload.trips;
      state.totalPage = action.payload.total;
      state.numberOfPage = action.payload.numberOfPage;
      state.is_loading = false;
    },
    [getConfirmedTrips.rejected]: (state, action) => {
      state.is_loading = false;
      state.error_message = "Something Wrong";
    },
    [getConfirmedTrips.pending]: (state) => {
      state.is_loading = true;
    },

    // e-way bill----
    [uploadEWayBill.fulfilled]: (state, action) => {
      state.confirmed_trip.documents.e_way_bill = [
        action.payload?.upload,
        ...state.confirmed_trip,
      ];
      state.e_way_bill_loading = false;
    },
    [uploadEWayBill.pending]: (state, action) => {
      state.e_way_bill_loading = true;
    },
    [uploadEWayBill.rejected]: (state, action) => {
      state.e_way_bill_loading = false;
      state.error = true;
      state.error_message = "something wrong";
    },

    // weight slip----
    [uploadWeightSlip.fulfilled]: (state, action) => {
      state.confirmed_trip.documents.weight_slip = [
        action.payload?.upload,
        ...state.confirmed_trip,
      ];
      state.weight_slip_loading = false;
    },
    [uploadWeightSlip.pending]: (state, action) => {
      state.weight_slip_loading = true;
    },
    [uploadWeightSlip.rejected]: (state, action) => {
      state.weight_slip_loading = false;
      state.error = true;
      state.error_message = "something wrong";
    },

    // Load Receipt----
    [uploadLoadReceipt.fulfilled]: (state, action) => {
      state.confirmed_trip.documents.load_receipt = [
        action.payload?.upload,
        ...state.confirmed_trip,
      ];
      state.load_receipt_loading = false;
    },
    [uploadWeightSlip.pending]: (state, action) => {
      state.load_receipt_loading = true;
    },
    [uploadWeightSlip.rejected]: (state, action) => {
      state.load_receipt_loading = false;
      state.error = true;
      state.error_message = "something wrong";
    },
    // Invoice----
    [uploadWeightSlip.fulfilled]: (state, action) => {
      state.confirmed_trip.documents.invoice = [
        action.payload?.upload,
        ...state.confirmed_trip,
      ];
      state.invoice_loading = false;
    },
    [uploadWeightSlip.pending]: (state, action) => {
      state.invoice_loading = true;
    },
    [uploadWeightSlip.rejected]: (state, action) => {
      state.invoice_loading = false;
      state.error = true;
      state.error_message = "something wrong";
    },

    // search confirmed trips-----
    [searchConfirmedTrip.fulfilled]: (state, action) => {
      state.confirmed_trips = action.payload.trip;
      state.totalPage = action.payload.total;
      state.numberOfPage = action.payload.numberOfPage;
      state.is_loading = false;
    },
    [searchConfirmedTrip.pending]: (state, action) => {
      state.is_loading = true;
    },
    [searchConfirmedTrip.rejected]: (state, action) => {
      state.is_loading = false;
      state.error = true;
      state.error_message = "something wrong";
    },
  },
});

export const { getConfirmedTripById } = confirmedTripsSlice.actions;
export default confirmedTripsSlice.reducer;
