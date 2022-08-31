import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import rootClient from "../../config/rootClient";

const initialState = {
  is_loading: false,
  success: false,
  error_message: null,
  totalPage: "",
  numberOfPage: "",
  vehicle_types: [],
  vehicle_type: {
    vehicle_type: "",
    capacity: "",
    body_type: "",
    tyre: "",
    length: "",
  },
};

export const getVehicleTypes = createAsyncThunk(
  "get-vehicle-types",
  async (page, { rejectWithValue }) => {
    try {
      const response = await rootClient.get(
        `api/v1/admin/vehicle-types?page=${page}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchVehicleTypes = createAsyncThunk(
  "search-vehicle-types",
  async (value, { rejectWithValue }) => {
    try {
      const response = await rootClient.get(
        `api/v1/admin/vehicle-types/${value}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const createVehicleTypes = createAsyncThunk(
  "create-vehicle-types",
  async (body, { getState, rejectWithValue }) => {
    const { vehicle_types } = getState();
    const { vehicle_type } = vehicle_types;
    try {
      const response = await rootClient.post(
        "api/v1/admin/vehicle-types",
        vehicle_type
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteVehicleTypes = createAsyncThunk(
  "delete-vehicle-types",
  async (id, { rejectWithValue }) => {
    try {
      const response = await rootClient.delete(
        `api/v1/admin/vehicle-types/${id}`
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateVehicleTypes = createAsyncThunk(
  "update-vehicle-types",
  async (data, { getState, rejectWithValue }) => {
    const { vehicle_types } = getState();
    const { vehicle_type } = vehicle_types;
    try {
      const response = await rootClient.put(
        `api/v1/admin/vehicle-types/${vehicle_type._id}`,
        vehicle_type
      );
      return vehicle_type;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const changeVehicleTypesStatus = createAsyncThunk(
  "change-vehicle-types-status",
  async (data, { rejectWithValue }) => {
    const { id, visible } = data;
    try {
      const response = await rootClient.put(
        `api/v1/admin/vehicle-types/${id}`,
        {
          visible,
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const vehicleTypesSlice = createSlice({
  name: "vehicle_types",
  initialState,
  reducers: {
    getVehicleTypeById(state, action) {
      state.vehicle_type = state.vehicle_types.find(
        (item) => item._id === action.payload
      );
    },
    addVehicleType(state, action) {
      // state.loaders = [action.payload, ...state.loaders];
      state.vehicle_types.push(action.payload);
    },
    setVehicleType(state, action) {
      state.vehicle_type.vehicle_type = action.payload;
    },
    setCapacity(state, action) {
      state.vehicle_type.capacity = action.payload;
    },
    setBodyType(state, action) {
      state.vehicle_type.body_type = action.payload;
    },
    setTyre(state, action) {
      state.vehicle_type.tyre = action.payload;
    },
    setLength(state, action) {
      state.vehicle_type.length = action.payload;
    },
  },

  extraReducers: {
    // get -------------------------------------------
    [getVehicleTypes.fulfilled]: (state, action) => {
      state.vehicle_types = action.payload.vehicle_types;
      state.totalPage = action.payload.total;
      state.numberOfPage = action.payload.numberOfPage;
      state.is_loading = true;
    },
    [getVehicleTypes.pending]: (state) => {
      state.is_loading = true;
      state.error_message = null;
    },
    [getVehicleTypes.rejected]: (state, action) => {
      state.is_loading = false;
      state.error_message =
        "Something wrong please check your internet connection";
    },

    // search vehicle type-------
    [searchVehicleTypes.fulfilled]: (state, action) => {
      state.vehicle_types = action.payload;
      state.totalPage = action.payload.total;
      state.numberOfPage = action.payload.numberOfPage;
      state.is_loading = false;
    },
    [searchVehicleTypes.pending]: (state, action) => {
      state.is_loading = true;
      state.error_message = null;
    },
    [searchVehicleTypes.rejected]: (state, action) => {
      state.is_loading = false;
      state.error_message =
        "Something wrong please check your internet connection";
    },
    // create  -------------------------------------------
    [createVehicleTypes.fulfilled]: (state, action) => {
      state.vehicle_types = [
        action.payload.vehicle_type,
        ...state.vehicle_types,
      ];
      state.is_loading = false;
    },
    [createVehicleTypes.pending]: (state) => {
      state.is_loading = true;
      state.success = false;
    },
    [createVehicleTypes.rejected]: (state, action) => {
      state.is_loading = false;
      state.error_message =
        "Something wrong please check your internet connection";
    },
    // delete  --------------------------------------
    [deleteVehicleTypes.fulfilled]: (state, { payload: id }) => {
      state.vehicle_types = state.vehicle_types.filter(
        (item) => item._id !== id
      );
    },

    [deleteVehicleTypes.pending]: (state, action) => {
      state.is_loading = true;
      state.error_message = null;
    },
    [deleteVehicleTypes.rejected]: (state, action) => {
      state.error_message =
        "Something wrong please check your internet connection";
      state.is_loading = false;
    },
    // change  status  --------------------------------------
    [changeVehicleTypesStatus.fulfilled]: (state, action) => {
      const { id, visible } = action.payload;
      state.vehicle_types = state.vehicle_types.map((item) =>
        item._id === id ? { ...item, visible } : item
      );
      state.vehicle_type = { ...state.vehicle_type, visible };
      state.is_loading = false;
    },

    [changeVehicleTypesStatus.pending]: (state, action) => {
      state.is_loading = true;
      state.error_message = null;
    },
    [changeVehicleTypesStatus.rejected]: (state, action) => {
      state.error_message =
        "Something wrong please check your internet connection";
      state.is_loading = false;
    },

    // update   --------------------------------------
    [updateVehicleTypes.fulfilled]: (state, action) => {
      const updatedData = action.payload;
      state.vehicle_types = state.vehicle_types.map((item) =>
        item._id === updatedData._id ? updatedData : item
      );
      state.vehicle_type = updatedData;
      state.is_loading = true;
    },

    [updateVehicleTypes.pending]: (state, action) => {
      state.is_loading = true;
      state.error_message = null;
    },
    [updateVehicleTypes.rejected]: (state, action) => {
      state.error_message =
        "Something wrong please check your internet connection";
      state.is_loading = false;
    },
  },
});
export const {
  getVehicleTypeById,
  addVehicleType,
  setVehicleType,
  setBodyType,
  setCapacity,
  setLength,
  setTyre,
} = vehicleTypesSlice.actions;
export default vehicleTypesSlice.reducer;
