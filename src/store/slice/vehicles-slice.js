import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import rootClient from "../../config/rootClient";

const initialState = {
  is_loading: false,
  rc_loading: false,
  image_loading: false,
  error: false,
  error_message: null,
  exist_message: null,
  totalPage: "",
  numberOfPage: "",
  search_term: "rc_number",
  vehicles: [],
  vehicle: {
    transporter_id: "",
    transporter_name: "",
    rc_number: "",
    body_type: "",
    wheels: "",
    load_capacity: "",
    length: "",
    owner_name: "",
    rc_document: "",
    vehicle_image: "",
  },
};

// get All vehicles-------------------

export const getVehicles = createAsyncThunk(
  "get-vehicles",
  async (page, { rejectWithValue }) => {
    try {
      const response = await rootClient.get(
        `api/v1/admin/vehicles?page=${page}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// search api-------------
export const searchVehicle = createAsyncThunk(
  "search-vehicle",
  async (value, { getState, rejectWithValue }) => {
    const { vehicles } = getState();
    try {
      const response = await rootClient.get(
        `api/v1/admin/vehicles/${vehicles.search_term}/${value}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Post Vehicles-------------------
export const createVehicles = createAsyncThunk(
  "create-vehicles",
  async (body, { rejectWithValue }) => {
    try {
      const response = await rootClient.post("api/v1/admin/vehicles", body);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete Vehicles----------------------------
export const deleteVehicles = createAsyncThunk(
  "delete-vehicles",
  async (id, { rejectWithValue }) => {
    try {
      const response = await rootClient.delete(`api/v1/admin/vehicles/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// change status----------------------------

export const changeVehicleStatus = createAsyncThunk(
  "change-vehicle-status",
  async (data, { rejectWithValue }) => {
    const { id, status } = data;
    try {
      const response = await rootClient.put(`api/v1/admin/vehicles/${id}`, {
        status,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update vehicle------------------------------
export const updateVehicles = createAsyncThunk(
  "update-vehicles",
  async (data, { rejectWithValue }) => {
    try {
      const response = await rootClient.put(
        `api/v1/admin/vehicles/${data._id}`,
        data
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// vehicle rc uploader------------------
export const upload_vehicle_rc = createAsyncThunk(
  "upload-vehicle-rc",
  async (data, { getState, rejectWithValue }) => {
    const { vehicles } = getState();
    const id = vehicles.vehicle._id;
    const formData = new FormData();
    formData.append("image", data);

    try {
      const response = await rootClient.post(
        `/api/v1/admin/vehicles-rc-upload/${id}`,
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

// vehicle rc uploader------------------
export const upload_vehicle_picture = createAsyncThunk(
  "upload-vehicle-picture",
  async (data, { getState, rejectWithValue }) => {
    const { vehicles } = getState();
    const id = vehicles.vehicle._id;
    const formData = new FormData();
    formData.append("image", data);
    try {
      const response = await rootClient.post(
        `/api/v1/admin/vehicles-image-upload/${id}`,
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

const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    getVehicleById(state, action) {
      state.vehicle = state.vehicles.find(
        (item) => item._id === action.payload
      );
    },
    setTransporterName(state, action) {
      state.vehicle.transporter_id = action.payload;
    },
    setVehicleNumber(state, action) {
      state.vehicle.rc_number = action.payload;
    },

    setBodyType(state, action) {
      state.vehicle.body_type = action.payload;
    },
    setTyre(state, action) {
      state.vehicle.wheels = action.payload;
    },
    setCapacity(state, action) {
      state.vehicle.load_capacity = action.payload;
    },
    setLength(state, action) {
      state.vehicle.length = action.payload;
    },
    setOwnerName(state, action) {
      state.vehicle.owner_name = action.payload;
    },
    setSearchTerm(state, action) {
      state.search_term = action.payload;
    },

    // addVehicle(state, action) {
    //   // state.vehicles = [action.payload, ...state.vehicles];
    //   state.vehicle.push(action.payload);
    // },
  },

  extraReducers: {
    // get Vehicle-------------------------------------------
    [getVehicles.fulfilled]: (state, action) => {
      state.vehicles = action.payload.vehicle;
      state.exist_message = null;
      state.totalPage = action.payload.total;
      state.numberOfPage = action.payload.numberOfPage;
      state.is_loading = false;
    },
    [getVehicles.pending]: (state) => {
      state.is_loading = true;
    },
    [getVehicles.rejected]: (state, action) => {
      state.is_loading = false;
      state.error_message = "Something Wrong";
    },

    // search--------
    [searchVehicle.fulfilled]: (state, action) => {
      state.vehicles = action.payload.vehicle;
      state.totalPage = action.payload.total;
      state.numberOfPage = action.payload.numberOfPage;
      state.is_loading = true;
    },
    [searchVehicle.pending]: (state, action) => {
      state.is_loading = true;
    },
    [searchVehicle.rejected]: (state, action) => {
      state.is_loading = false;
    },
    // create  vehicle-------------------------------------------
    [createVehicles.fulfilled]: (state, action) => {
      const newVehicle = {
        ...action.payload.vehicle,
        vehicle: {
          _id: state.vehicle.transporter_id,
          user_name: state.vehicle.transporter_name,
        },
      };
      state.vehicles = [newVehicle, ...state.vehicles];

      state.error = false;
      state.exist_message = "success";
      state.is_loading = false;
    },
    [createVehicles.pending]: (state) => {
      state.is_loading = true;
    },
    [createVehicles.rejected]: (state, action) => {
      state.is_loading = false;
      state.error = true;
      state.error_message = "Something went wrong !";
      state.exist_message = "Vehicle number already exist";
    },
    // delete Vehicle --------------------------------------
    [deleteVehicles.fulfilled]: (state, { payload: id }) => {
      state.vehicles = state.vehicles.filter((item) => item._id !== id);
    },
    [deleteVehicles.pending]: (state, { payload: id }) => {
      state.is_loading = true;
    },

    [deleteVehicles.rejected]: (state, action) => {
      state.error_message = true;
      state.is_loading = false;
    },
    // change Vehicle status  --------------------------------------
    [changeVehicleStatus.fulfilled]: (state, action) => {
      const { id, status } = action.payload;

      state.vehicles = state.vehicles.map((item) =>
        item._id === id ? { ...item, status } : item
      );
      state.vehicle = { ...state.vehicle, status };
    },
    [changeVehicleStatus.pending]: (state, action) => {
      state.is_loading = true;
    },

    [changeVehicleStatus.rejected]: (state, action) => {
      state.error_message = true;
      state.is_loading = false;
    },

    // update vehicles----------

    [updateVehicles.fulfilled]: (state, action) => {
      const updatedData = action.payload;
      state.vehicles = state.vehicles.map((item) =>
        item._id === updatedData._id ? updatedData : item
      );
      state.vehicle = updatedData;
      state.is_loading = false;
    },
    [updateVehicles.pending]: (state, action) => {
      state.is_loading = true;
    },
    [updateVehicles.rejected]: (state, action) => {
      state.is_loading = false;
    },

    // rc upload---------------------
    [upload_vehicle_rc.fulfilled]: (state, action) => {
      state.vehicle.rc_document = action.payload.upload;
      state.rc_loading = false;
    },
    [upload_vehicle_rc.pending]: (state, action) => {
      // state.vehicle.rc_document = [action.payload, ...state.vehicles];
      state.rc_loading = true;
    },
    [upload_vehicle_rc.rejected]: (state, action) => {
      // state.vehicle.rc_document = [action.payload, ...state.vehicles];
      state.rc_loading = false;
    },

    // rc upload---------------------
    [upload_vehicle_picture.fulfilled]: (state, action) => {
      state.vehicle.vehicle_image = action.payload.upload;
      state.image_loading = false;
    },
    [upload_vehicle_picture.pending]: (state, action) => {
      // state.vehicle.rc_document = [action.payload, ...state.vehicles];
      state.image_loading = true;
    },
    [upload_vehicle_picture.rejected]: (state, action) => {
      // state.vehicle.rc_document = [action.payload, ...state.vehicles];
      state.image_loading = false;
    },
  },
});

export const {
  getVehicleById,
  setTransporterName,
  setVehicleNumber,
  setBodyType,
  setLength,
  setTyre,
  setCapacity,
  setOwnerName,
  setSearchTerm,
} = vehiclesSlice.actions;
export default vehiclesSlice.reducer;
