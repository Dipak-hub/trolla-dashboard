import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import rootClient from "../../config/rootClient";

const initialState = {
  is_loading: false,
  loading: false,
  dl_loading: false,
  error: false,
  error_message: null,
  exist_message: null,
  totalPage: "",
  numberOfPage: "",
  search_term: "mobile_primary",
  drivers: [],
  driver: {
    transporter_id: "",
    transporter_name: "",
    user_name: "",
    mobile_primary: "",
    mobile_secondary: "",
    address: "",
    documents: {
      dl_document: "",
      name_in_bank: "",
      account_number: "",
      ifsc_code: "",
      upi_id: "",
    },
  },
};

// get all driver------------------------
export const getDrivers = createAsyncThunk(
  "get-drivers",
  async (page, { rejectWithValue }) => {
    try {
      const response = await rootClient.get(
        `api/v1/admin/drivers?page=${page}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// search driver-----------------
export const searchDriver = createAsyncThunk(
  "search-driver",
  async (searchValue, { getState, rejectWithValue }) => {
    const { drivers } = getState();
    try {
      const response = await rootClient.get(
        `/api/v1/admin/drivers/${drivers.search_term}/${searchValue}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// create driver--------------------
export const createDriver = createAsyncThunk(
  "create-driver",
  async (body, { getState, rejectWithValue }) => {
    const { drivers } = getState();
    const { driver } = drivers;
    try {
      const response = await rootClient.post("api/v1/admin/drivers", driver);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete driver-----------------------

export const deleteDriver = createAsyncThunk(
  "delete-driver",
  async (id, { rejectWithValue }) => {
    try {
      const response = await rootClient.delete(`api/v1/admin/drivers/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// driver status change update-------------
export const changeDriverStatus = createAsyncThunk(
  "change-driver-status",
  async (data, { rejectWithValue }) => {
    const { id, status } = data;
    try {
      const response = await rootClient.put(`api/v1/admin/drivers/${id}`, {
        status,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// driver update-------------
export const updateDrivers = createAsyncThunk(
  "update-driver",
  async (data, { getState, rejectWithValue }) => {
    const { drivers } = getState();
    const { driver } = drivers;
    try {
      const response = await rootClient.put(
        `api/v1/admin/drivers/${driver._id}`,
        driver
      );
      return driver;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// upload  license-------------------
export const uploadDrivingLicense = createAsyncThunk(
  "upload-driving-license",
  async (data, { getState, rejectWithValue }) => {
    console.log("first");
    const { drivers } = getState();
    const id = drivers.driver._id;

    const formData = new FormData();
    formData.append("image", data);

    try {
      const response = await rootClient.post(
        `/api/v1/admin/driving-license/${id}`,
        formData,
        {
          headers: {
            accept: "application/json",
            "content-type": "multipart/form-data",
          },
        }
      );
      console.log("sec", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const driversSlice = createSlice({
  name: "drivers",
  initialState,
  reducers: {
    getDriverById(state, action) {
      state.driver = state.drivers.find((item) => item._id === action.payload);
    },

    addDriver(state, action) {
      state.drivers = [action.payload, ...state.drivers];
      // state.drivers.push(action.payload);
    },

    setTransporter(state, action) {
      const { _id, user_name } = action.payload;
      state.driver.transporter_id = _id;
      state.driver.transporter_name = user_name;
    },
    setDriverName(state, action) {
      state.driver.user_name = action.payload;
    },
    setMobilePrimary(state, action) {
      state.driver.mobile_primary = action.payload;
    },
    setMobileSecondary(state, action) {
      state.driver.mobile_secondary = action.payload;
    },
    setEmail(state, action) {
      state.driver.email = action.payload;
    },
    setAddress(state, action) {
      state.driver.address = action.payload;
    },
    setDrivingLicense(state, action) {
      state.driver.documents.dl_document = action.payload;
    },
    setNameInBank(state, action) {
      state.driver.documents.name_in_bank = action.payload;
    },
    setAccountNumber(state, action) {
      state.driver.documents.account_number = action.payload;
    },
    setIfscCode(state, action) {
      state.driver.documents.ifsc_code = action.payload;
    },
    setUpiId(state, action) {
      state.driver.documents.upi_id = action.payload;
    },

    setSearchTerm(state, action) {
      state.search_term = action.payload; // state for search
    },
  },

  extraReducers: {
    // get transporter-------------------------------------------
    [getDrivers.fulfilled]: (state, action) => {
      state.drivers = action.payload.drivers;
      state.totalPage = action.payload.total;
      state.numberOfPage = action.payload.numberOfPage;
      state.is_loading = false;
      state.error_message = null;
    },
    [getDrivers.pending]: (state) => {
      state.is_loading = true;
    },
    [getDrivers.rejected]: (state, action) => {
      state.is_loading = false;
      state.error_message =
        "Something wrong please check your internet connection";
    },

    // search transporter-------------------------
    [searchDriver.fulfilled]: (state, action) => {
      state.drivers = action.payload.driver;
      state.numberOfPage = false;
      state.is_loading = false;
      state.error_message = false;
    },
    [searchDriver.pending]: (state, action) => {
      state.is_loading = true;
    },
    [searchDriver.rejected]: (state, action) => {
      state.is_loading = false;
      state.error_message =
        "Something wrong please check your internet connection";
    },

    // create  transporter-------------------------------------------
    [createDriver.fulfilled]: (state, action) => {
      const newDriver = {
        ...action.payload.driver,
        transporter: {
          _id: state.driver.transporter_id,
          user_name: state.driver.transporter_name,
        },
      };

      state.drivers = [newDriver, ...state.drivers];
      state.error_message = false;
      state.is_loading = false;
    },
    [createDriver.pending]: (state) => {
      state.is_loading = true;
    },
    [createDriver.rejected]: (state, action) => {
      state.is_loading = false;
      state.error_message =
        "Something wrong please check your internet connection";
    },
    // delete loader --------------------------------------
    [deleteDriver.fulfilled]: (state, { payload: id }) => {
      state.drivers = state.drivers.filter((item) => item._id !== id);
      state.is_loading = false;
      state.error_message = false;
    },

    [deleteDriver.pending]: (state, action) => {
      state.is_loading = true;
    },
    [deleteDriver.rejected]: (state, action) => {
      state.error_message =
        "Something wrong please check your internet connection";
      state.is_loading = false;
    },
    // change loader status  --------------------------------------
    [changeDriverStatus.fulfilled]: (state, action) => {
      const { id, status } = action.payload;
      state.drivers = state.drivers.map((item) =>
        item._id === id ? { ...item, status } : item
      );
      state.driver = { ...state.driver, status };
      state.error_message = false;
    },
    [changeDriverStatus.pending]: (state, action) => {
      state.is_loading = true;
    },
    [changeDriverStatus.rejected]: (state, action) => {
      state.error_message =
        "Something wrong please check your internet connection";
      state.is_loading = false;
    },

    // update driver----------------
    [updateDrivers.fulfilled]: (state, action) => {
      const driver = action.payload;
      state.drivers = state.drivers.map((item) =>
        item._id === driver._id ? driver : item
      );
      state.driver = driver;
      state.error_message = false;
    },
    [updateDrivers.pending]: (state, action) => {
      state.loading = true;
    },
    [updateDrivers.rejected]: (state, action) => {
      state.loading = false;
      state.error_message =
        "Something wrong please check your internet connection";
    },
    // upload driver license------------------
    [uploadDrivingLicense.fulfilled]: (state, action) => {
      state.driver.documents.dl_document = action.payload.uploaded_doc;
      state.is_loading = false;
      state.dl_loading = false;
      state.error_message = null;
    },
    [uploadDrivingLicense.pending]: (state, action) => {
      state.loading = true;
      state.dl_loading = true;
    },
    [uploadDrivingLicense.rejected]: (state, action) => {
      state.loading = false;
      state.dl_loading = false;
      state.error_message =
        "Something wrong please check your internet connection";
    },
  },
});
export const {
  getDriverById,
  setTransporter,
  setDriverName,
  setMobilePrimary,
  setMobileSecondary,
  setEmail,
  setAddress,
  setDrivingLicense,
  setSearchTerm,
  setAccountNumber,
  setIfscCode,
  setNameInBank,
  setUpiId,
} = driversSlice.actions;

export default driversSlice.reducer;
