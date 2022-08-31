import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import rootClient from "../../config/rootClient";

const initialState = {
  is_loading: false,
  id_proof_loading: false,
  address_proof_loading: false,
  error: false,
  error_message: null,
  exist_message: null,
  totalPage: "",
  numberOfPage: "",
  search_term: "mobile_primary",
  loaders: [],
  loader: {
    user_name: "",
    mobile_primary: "",
    mobile_secondary: "",
    email: "",
    address: "",
    profile_pic: "",
    documents: {
      id_proof: "",
      address_proof: "",
      gst_number: "",
      pan_number: "",
    },
  },
};

export const getLoaders = createAsyncThunk(
  "get-loaders",
  async (page, { rejectWithValue }) => {
    try {
      const response = await rootClient.get(
        `api/v1/admin/loaders?page=${page}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// search loaders---------------------
export const searchLoader = createAsyncThunk(
  "search-loader",
  async (searchValue, { getState, rejectWithValue }) => {
    const { loaders } = getState();
    try {
      const response = await rootClient.get(
        `api/v1/admin/loaders/${loaders.search_term}/${searchValue}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// create loaders-------------

export const createLoaders = createAsyncThunk(
  "create-loaders",
  async (body, { getState, rejectWithValue }) => {
    try {
      const { loaders } = getState();
      const { loader } = loaders;
      const response = await rootClient.post("api/v1/admin/loaders", loader);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete loader----------------------------

export const deleteLoaders = createAsyncThunk(
  "delete-loaders",
  async (id, { rejectWithValue }) => {
    try {
      const response = await rootClient.delete(`api/v1/admin/loaders/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// status change loader----------------

export const changeLoadersStatus = createAsyncThunk(
  "change-loader-status",
  async (data, { rejectWithValue }) => {
    const { id, status } = data;
    try {
      const response = await rootClient.put(`api/v1/admin/loaders/${id}`, {
        status,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// loader update------------------------------------------------------------------------------------------------
export const updateLoaders = createAsyncThunk(
  "update-loaders",
  async (data, { getState, rejectWithValue }) => {
    const { loaders } = getState();
    const { loader } = loaders;
    try {
      const response = await rootClient.put(
        `api/v1/admin/loaders/${loader._id}`,
        loader
      );
      return loader;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// upload address proof-------------------
export const uploadAddressProof = createAsyncThunk(
  "upload-loader-address-proof",
  async (data, { getState, rejectWithValue }) => {
    const { loaders } = getState();
    const id = loaders.loader._id;
    const formData = new FormData();
    formData.append("image", data);

    try {
      const response = await rootClient.post(
        `/api/v1/admin/loaders/address-proof/${id}`,
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

// upload id proof-------------------
export const uploadIdProof = createAsyncThunk(
  "upload-loaders-id-proof",
  async (data, { getState, rejectWithValue }) => {
    const { loaders } = getState();
    const id = loaders.loader._id;
    const formData = new FormData();
    formData.append("image", data);

    try {
      const response = await rootClient.post(
        `/api/v1/admin/loaders/id-proof/${id}`,
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

const loadersSlice = createSlice({
  name: "loaders",
  initialState,
  reducers: {
    getLoaderById(state, action) {
      state.loader = state.loaders.find((item) => item._id === action.payload);
    },
    addLoader(state, action) {
      state.loaders = [action.payload, ...state.loaders];
      // state.loaders.push(action.payload);
    },

    setUserName(state, action) {
      state.loader.user_name = action.payload;
    },

    setMobilePrimary(state, action) {
      state.loader.mobile_primary = action.payload;
    },

    setMobileSecondary(state, action) {
      state.loader.mobile_secondary = action.payload;
    },

    setEmail(state, action) {
      state.loader.email = action.payload;
    },

    setAddress(state, action) {
      state.loader.address = action.payload;
    },
    setIDProof(state, action) {
      state.loader.documents.id_proof = action.payload;
    },
    setAddressProof(state, action) {
      state.loader.documents.address_proof = action.payload;
    },
    setGstNumber(state, action) {
      state.loader.documents.gst_number = action.payload;
    },
    setPanNumber(state, action) {
      state.loader.documents.pan_number = action.payload;
    },
    setSearchTerm(state, action) {
      state.search_term = action.payload;
    },
  },

  extraReducers: {
    // get loader-------------------------------------------
    [getLoaders.fulfilled]: (state, action) => {
      state.loaders = action.payload.loaders;
      state.totalPage = action.payload.total;
      state.numberOfPage = action.payload.numberOfPage;
      state.is_loading = false;
    },
    [getLoaders.pending]: (state) => {
      state.error_message = null;
      state.is_loading = true;
    },
    [getLoaders.rejected]: (state, action) => {
      state.is_loading = false;
      state.error_message =
        "Something wrong please check your internet connection";
    },

    // search loader-------
    [searchLoader.fulfilled]: (state, action) => {
      state.loaders = action.payload.loader;
      state.numberOfPage = false;
      state.is_loading = false;
    },
    [searchLoader.pending]: (state, action) => {
      state.is_loading = true;
      state.error_message = null;
    },
    [searchLoader.rejected]: (state, action) => {
      state.error_message =
        "Something wrong please check your internet connection";
      state.is_loading = false;
    },

    // create  loader-------------------------------------------
    [createLoaders.fulfilled]: (state, action) => {
      state.loaders = [action.payload, ...state.loaders];
      state.is_loading = false;
    },
    [createLoaders.pending]: (state) => {
      state.is_loading = true;
      state.error_message = null;
    },
    [createLoaders.rejected]: (state, action) => {
      state.is_loading = false;
      state.error_message =
        "Something wrong please check your internet connection";
    },
    // delete loader --------------------------------------
    [deleteLoaders.fulfilled]: (state, { payload: id }) => {
      state.loaders = state.loaders.filter((item) => item._id !== id);
      state.is_loading = false;
    },

    [deleteLoaders.pending]: (state, action) => {
      state.is_loading = true;
      state.error_message = null;
    },
    [deleteLoaders.rejected]: (state, action) => {
      state.error_message =
        "Something wrong please check your internet connection";
      state.is_loading = false;
    },
    // change loader status  --------------------------------------
    [changeLoadersStatus.fulfilled]: (state, action) => {
      const { id, status } = action.payload;
      state.loaders = state.loaders.map((item) =>
        item._id === id ? { ...item, status } : item
      );
      state.loader = { ...state.loader, status };
      state.is_loading = false;
    },

    [changeLoadersStatus.pending]: (state, action) => {
      state.is_loading = true;
      state.error_message = null;
    },
    [changeLoadersStatus.rejected]: (state, action) => {
      state.error_message =
        "Something wrong please check your internet connection";
      state.is_loading = false;
    },

    // update loader----------------------
    [updateLoaders.fulfilled]: (state, action) => {
      const loader = action.payload;
      state.loaders = state.loaders.map((item) =>
        item._id === loader._id ? loader : item
      );
      state.loader = loader;
      state.is_loading = false;
    },
    [updateLoaders.pending]: (state, action) => {
      state.is_loading = true;
    },
    [updateLoaders.rejected]: (state, action) => {
      state.is_loading = false;
      state.error_message =
        "Something wrong please check your internet connection";
    },
    // upload address proof-------------

    [uploadAddressProof.fulfilled]: (state, action) => {
      state.loader.documents.address_proof = action.payload.uploaded_doc;
      state.address_proof_loading = false;
    },

    [uploadAddressProof.pending]: (state, action) => {
      state.address_proof_loading = true;
      state.error_message = null;
    },
    [uploadAddressProof.rejected]: (state, action) => {
      state.address_proof_loading = false;
      state.error_message =
        "Something wrong please check your internet connection";
    },

    // upload id proof-------------
    [uploadIdProof.fulfilled]: (state, action) => {
      state.loader.documents.id_proof = action.payload.uploaded_doc;
      state.id_proof_loading = false;
    },
    [uploadIdProof.pending]: (state, action) => {
      state.id_proof_loading = true;
    },
    [uploadIdProof.rejected]: (state, action) => {
      state.id_proof_loading = false;
      state.error_message =
        "Something wrong please check your internet connection";
    },
  },
});
export const {
  getLoaderById,
  setUserName,
  setMobilePrimary,
  setMobileSecondary,
  setEmail,
  setAddress,
  setAddressProof,
  setIDProof,
  setGstNumber,
  setPanNumber,
  setSearchTerm,
} = loadersSlice.actions;
export default loadersSlice.reducer;
