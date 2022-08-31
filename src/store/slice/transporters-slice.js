import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// import axios from "axios";
import rootClient from "../../config/rootClient";

const initialState = {
  is_loading: false,
  id_proof_loading: false,
  address_proof_loading: false,
  error_message: null,
  totalPage: "",
  numberOfPage: "",
  search_term: "mobile_primary",
  transporters: [],
  all_transporter: [],
  transporter: {
    user_name: "",
    mobile_primary: "",
    mobile_secondary: "",
    email: "",
    address: "",
    documents: {
      id_proof: "",
      address_proof: "",
      gst_number: "",
      pan_number: "",
      name_in_bank: "",
      account_number: "",
      ifsc_code: "",
      upi_id: "",
    },
  },
};

// get all transporters  with pagination------------------------
export const getTransporters = createAsyncThunk(
  "get-transporters",
  async (page, { rejectWithValue }) => {
    try {
      const response = await rootClient.get(
        `api/v1/admin/transporters?page=${page}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get all transporter except pagination-------
export const getAllTransporters = createAsyncThunk(
  "get-all-transporters",
  async (page, { rejectWithValue }) => {
    try {
      const response = await rootClient.get("api/v1/admin/transporters/all");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// search api------------------------
export const searchTransporter = createAsyncThunk(
  "search-transporter",
  async (searchValue, { getState, rejectWithValue }) => {
    const { transporters } = getState();
    try {
      const response = await rootClient.get(
        `api/v1/admin/transporters/${transporters.search_term}/${searchValue}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// create transporter --------------------
export const createTransporters = createAsyncThunk(
  "create-transporters",
  async (body, { getState, rejectWithValue }) => {
    const { transporters } = getState();
    try {
      const response = await rootClient.post(
        "api/v1/admin/transporters",
        transporters.transporter
      );
      return response.data.transporter;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete transporters-----------------------

export const deleteTransporters = createAsyncThunk(
  "delete-transporters",
  async (id, { rejectWithValue }) => {
    try {
      const response = await rootClient.delete(
        `api/v1/admin/transporters/${id}`
      );

      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// upload id proof documents------------------
export const uploadIdProof = createAsyncThunk(
  "transporter-upload-id-proof",
  async (data, { getState, rejectWithValue }) => {
    const { transporters } = getState();
    const id = transporters.transporter._id;
    const formData = new FormData();
    formData.append("image", data);

    try {
      const response = await rootClient.post(
        `/api/v1/admin/transporters-id-proof/${id}`,
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

// upload address proof-------------------
export const uploadAddressProof = createAsyncThunk(
  "transporter-upload-address-proof",
  async (data, { getState, rejectWithValue }) => {
    const { transporters } = getState();
    const id = transporters.transporter._id;

    const formData = new FormData();
    formData.append("image", data);

    try {
      const response = await rootClient.post(
        `/api/v1/admin/transporters-address-proof/${id}`,
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

// transporter status change update-------------
export const changeTransporterStatus = createAsyncThunk(
  "transporter-update-status",
  async (data, { rejectWithValue }) => {
    const { id, status } = data;

    try {
      const response = await rootClient.put(`api/v1/admin/transporters/${id}`, {
        status,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update transporter-------------------------
export const updateTransporters = createAsyncThunk(
  "update-transporters",
  async (data, { getState, rejectWithValue }) => {
    const { transporters } = getState();
    const transporter = transporters.transporter;
    try {
      const response = await rootClient.put(
        `api/v1/admin/transporters/${transporter._id}`,
        transporter
      );
      return transporter;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const transportersSlice = createSlice({
  name: "transporters",
  initialState,
  reducers: {
    getTransporterById(state, action) {
      state.transporter = state.transporters.find(
        (item) => item._id === action.payload
      );
    },
    addTransporter(state, action) {
      state.transporters = [action.payload, ...state.transporters];
      // state.transporters.push(action.payload);
    },

    setMobilePrimary(state, action) {
      state.transporter.mobile_primary = action.payload;
    },
    setMobileSecondary(state, action) {
      state.transporter.mobile_secondary = action.payload;
    },
    setUserName(state, action) {
      state.transporter.user_name = action.payload;
    },
    setEmail(state, action) {
      state.transporter.email = action.payload;
    },

    setAddress(state, action) {
      state.transporter.address = action.payload;
    },
    setGstNumber(state, action) {
      state.transporter.documents.gst_number = action.payload;
    },
    setPanNumber(state, action) {
      state.transporter.documents.pan_number = action.payload;
    },
    setIdProof(state, action) {
      state.transporter.documents.id_proof = action.payload;
    },
    setAddressProof(state, action) {
      state.transporter.documents.address_proof = action.payload;
    },
    setNameInBank(state, action) {
      state.transporter.documents.name_in_bank = action.payload;
    },
    setAccountNumber(state, action) {
      state.transporter.documents.account_number = action.payload;
    },
    setIfscCode(state, action) {
      state.transporter.documents.ifsc_code = action.payload;
    },
    setUpiId(state, action) {
      state.transporter.documents.upi_id = action.payload;
    },
    setSearchTerm(state, action) {
      state.search_term = action.payload;
    },
  },

  extraReducers: {
    // get transporter-------------------------------------------
    [getTransporters.fulfilled]: (state, action) => {
      state.transporters = action.payload.transporters;
      state.totalPage = action.payload.total;
      state.numberOfPage = action.payload.numberOfPage;
      state.is_loading = false;
      state.error_message = null;
    },
    [getTransporters.pending]: (state) => {
      state.is_loading = true;
    },
    [getTransporters.rejected]: (state, action) => {
      state.is_loading = false;
      state.error_message =
        "Something wrong please check your internet connection";
    },
    // all  the transporter -------------------------------------------
    [getAllTransporters.fulfilled]: (state, action) => {
      state.all_transporter = action.payload.transporters;
      state.is_loading = false;
    },
    [getAllTransporters.pending]: (state, action) => {
      state.is_loading = true;
    },
    [getAllTransporters.rejected]: (state, action) => {
      state.is_loading = false;
      state.error_message =
        "Something wrong please check your internet connection";
    },

    // search reducer--------
    [searchTransporter.fulfilled]: (state, action) => {
      state.transporters = action.payload.transporter;
      state.loading = false;
      state.numberOfPage = false;
    },
    [searchTransporter.pending]: (state, action) => {
      state.loading = true;
    },
    [searchTransporter.rejected]: (state, action) => {
      state.loading = false;
      state.error_message =
        "Something wrong please check your internet connection";
    },

    // create  transporter-------------------------------------------
    [createTransporters.fulfilled]: (state, action) => {
      state.transporters = [action.payload, ...state.transporters];
      state.is_loading = false;
    },
    [createTransporters.pending]: (state) => {
      state.is_loading = true;
    },
    [createTransporters.rejected]: (state, action) => {
      state.is_loading = false;
    },
    // delete transporter --------------------------------------
    [deleteTransporters.fulfilled]: (state, { payload: id }) => {
      state.transporters = state.transporters.filter((item) => item._id !== id);
    },
    [deleteTransporters.pending]: (state, { payload: id }) => {
      state.is_loading = true;
    },

    [deleteTransporters.rejected]: (state, action) => {
      state.error_message =
        "Something wrong please check your internet connection";
      state.is_loading = false;
    },
    // delete transporter --------------------------------------
    [updateTransporters.fulfilled]: (state, action) => {
      const transporter = action.payload;
      state.transporters = state.transporters.map((item) =>
        item._id === transporter._id ? transporter : item
      );
      state.is_loading = false;
    },
    [updateTransporters.pending]: (state, action) => {
      state.is_loading = true;
    },

    [updateTransporters.rejected]: (state, action) => {
      state.error_message =
        "Something wrong please check your internet connection";
      state.is_loading = false;
    },

    // change transporter status  --------------------------------------
    [changeTransporterStatus.fulfilled]: (state, action) => {
      const { id, status } = action.payload;
      state.transporters = state.transporters.map((item) =>
        item._id === id ? { ...item, status } : item
      );
      state.transporter = { ...state.transporter, status };
      state.is_loading = false;
    },

    // update transporter--------------------------
    [changeTransporterStatus.fulfilled]: (state, action) => {
      const updatedData = action.payload;
      state.transporters = state.transporters.map((item) =>
        item._id === updatedData._id ? updatedData : item
      );
      state.transporter = updatedData;
    },
  },
  [changeTransporterStatus.pending]: (state, action) => {
    state.is_loading = true;
  },
  [changeTransporterStatus.rejected]: (state, action) => {
    state.error_message =
      "Something wrong please check your internet connection";
    state.is_loading = false;
  },

  // upload id proof documents-----------------------
  [uploadIdProof.fulfilled]: (state, action) => {
    state.transporter.documents.id_proof = action.payload.uploaded_doc;
    state.id_Proof_loading = false;
  },
  [uploadIdProof.pending]: (state, action) => {
    state.id_Proof_loading = true;
  },
  [uploadIdProof.rejected]: (state, action) => {
    state.id_Proof_loading = false;
    state.error_message =
      "Something wrong please check your internet connection";
  },

  // upload Address Proof documents-----------------------
  [uploadAddressProof.fulfilled]: (state, action) => {
    state.transporter.documents.address_proof = action.payload.uploaded_doc;
    state.address_proof_loading = false;
  },
  [uploadAddressProof.pending]: (state, action) => {
    state.address_proof_loading = true;
  },
  [uploadAddressProof.rejected]: (state, action) => {
    state.address_proof_loading = false;
    state.error_message =
      "Something wrong please check your internet connection";
  },
});
export const {
  getTransporterById,
  setMobilePrimary,
  setMobileSecondary,
  setUserName,
  setEmail,
  setAddress,
  setGstNumber,
  setPanNumber,
  setAddressProof,
  setIdProof,
  setAccountNumber,
  setIfscCode,
  setNameInBank,
  setUpiId,
  setSearchTerm,
} = transportersSlice.actions;
export default transportersSlice.reducer;
