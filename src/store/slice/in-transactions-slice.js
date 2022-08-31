import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import rootClient from "../../config/rootClient";

const initialState = {
  is_loading: false,
  loading: false,
  error: false,
  totalPage: "",
  numberOfPage: "",
  razor_pay_out_response: {},
  transactions: [],
  transaction: {},
};

// get all transaction ------------------------
export const getInTransactions = createAsyncThunk(
  "get-in-transactions",
  async (page, { rejectWithValue }) => {
    try {
      const response = await rootClient.get(
        `api/v1/admin/transactions?page=${page}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const setRazorPayVendor = createAsyncThunk(
  "set-razor-pay-vendor-setup",
  async (body, { rejectWithValue }) => {
    try {
      const response = await rootClient.post(
        `api/v1/admin/razor-pay-vendor-setup`,
        body
      );
      // console.log("first", response.data.response);
      return response.data.response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const razorPayPayout = createAsyncThunk(
  "razor-pay-payout",
  async (body, { rejectWithValue }) => {
    try {
      const response = await rootClient.post(
        `api/v1/admin/razor-pay-payout`,
        body
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const inTransactionsSlice = createSlice({
  name: "in-transactions",
  initialState,
  reducers: {
    getTransactionById(state, action) {
      state.transaction = state.transactions.find(
        (item) => item._id === action.payload
      );
    },
    clearVendor(state, action) {
      state.razor_pay_out_response = { active: false };
    },
  },
  extraReducers: {
    // get transaction-------------------------------------------
    [getInTransactions.fulfilled]: (state, action) => {
      state.transactions = action.payload.transactions;
      state.is_loading = false;
      state.totalPage = action.payload.total;
      state.numberOfPage = action.payload.numberOfPage;
    },
    [getInTransactions.pending]: (state, action) => {
      state.is_loading = true;
    },
    [getInTransactions.rejected]: (state, action) => {
      state.is_loading = false;
    },
    // set razor pay vendor
    [setRazorPayVendor.fulfilled]: (state, action) => {
      state.razor_pay_out_response = action.payload;
      state.is_loading = false;
    },
    [setRazorPayVendor.pending]: (state, action) => {
      state.is_loading = true;
    },
    [setRazorPayVendor.rejected]: (state, action) => {
      state.is_loading = false;
    },
    //  razor pay payout
    [razorPayPayout.fulfilled]: (state, action) => {
      state.is_loading = false;
    },
    [razorPayPayout.pending]: (state, action) => {
      state.is_loading = true;
    },
    [razorPayPayout.rejected]: (state, action) => {
      state.is_loading = false;
    },
  },
});

export const { getTransactionById, clearVendor } = inTransactionsSlice.actions;
export default inTransactionsSlice.reducer;
