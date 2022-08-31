import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import rootClient from "../../config/rootClient";

const initialState = {
  is_loading: false,
  error: false,
  error_message: false,
  search_term: "load_no",
  totalPage: "",
  numberOfPage: "",
  page: "",
  loads: [],
  load: {},
};

export const getLoads = createAsyncThunk(
  "get-loads",
  async (page, { rejectWithValue }) => {
    try {
      const response = await rootClient.get(`api/v1/admin/loads?page=${page}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// search loads----------------
export const searchLoad = createAsyncThunk(
  "search-load",
  async (value, { getState, rejectWithValue }) => {
    const { loads } = getState();
    try {
      console.log("call");
      const response = await rootClient.get(
        `api/v1/admin/loads/${loads.search_term}/${value}`
      );
      console.log("end");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// create load----------------------------------------------

export const createLoads = createAsyncThunk(
  "create-loads",
  async (body, { rejectWithValue }) => {
    try {
      const response = await rootClient.post("api/v1/admin/loads", body);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete loads-------------------------------------------------------------------------
export const deleteLoads = createAsyncThunk(
  "delete-loads",
  async (id, { rejectWithValue }) => {
    try {
      const response = await rootClient.delete(`api/v1/admin/loads/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update loads---------------------------------

export const updateLoads = createAsyncThunk(
  "update-loads",
  async (data, { rejectWithValue }) => {
    try {
      const response = await rootClient.put(
        `api/v1/admin/loads/${data._id}`,
        data
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const changeLoadStatus = createAsyncThunk(
  "change-load-status",
  async (data, { rejectWithValue }) => {
    const { id, visible } = data;
    try {
      const response = await rootClient.put(`api/v1/admin/loads/${id}`, {
        visible,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const loadsSlice = createSlice({
  name: "loads",
  initialState,
  reducers: {
    getLoadById(state, action) {
      state.load = state.loads.find((item) => item._id === action.payload);
    },
    setSearchLoadTerm(state, action) {
      state.search_term = action.payload;
    },
    // addVehicleType(state, action) {
    //   // state.loaders = [action.payload, ...state.loaders];
    //   state.vehicle_types.push(action.payload);
    // },
    // setVehicleType(state, action) {
    //   state.vehicle_type.vehicle_type = action.payload;
    // },
    // setCapacity(state, action) {
    //   state.vehicle_type.capacity = action.payload;
    // },
    // setBodyType(state, action) {
    //   state.vehicle_type.body_type = action.payload;
    // },
    // setTyre(state, action) {
    //   state.vehicle_type.tyre = action.payload;
    // },
    // setLength(state, action) {
    //   state.vehicle_type.length = action.payload;
    // },
  },

  extraReducers: {
    // get -------------------------------------------
    [getLoads.fulfilled]: (state, action) => {
      state.loads = action.payload.loads;
      state.totalPage = action.payload.total;
      state.numberOfPage = action.payload.numberOfPage;
      state.is_loading = false;
    },
    [getLoads.pending]: (state) => {
      state.is_loading = true;
    },
    [getLoads.rejected]: (state, action) => {
      state.is_loading = false;
      state.error = true;
      state.error_message = "Something Wrong";
    },

    // search loads-------------
    [searchLoad.fulfilled]: (state, action) => {
      console.log(action.payload.load);
      state.loads = action.payload.load;
      state.numberOfPage = false;
      state.is_loading = false;
    },
    [searchLoad.pending]: (state, action) => {
      state.is_loading = true;
    },
    [searchLoad.rejected]: (state, action) => {
      state.is_loading = false;
      state.error = true;
      state.error_message = "something wrong";
    },
    // // create  -------------------------------------------
    [createLoads.fulfilled]: (state, action) => {
      state.loads = [action.payload.loads, ...state.loads];
      state.is_loading = false;
    },
    [createLoads.pending]: (state) => {
      state.is_loading = true;
    },
    [createLoads.rejected]: (state, action) => {
      state.is_loading = false;
      state.error = true;
      state.error_message = "something wrong";
    },
    // // delete  --------------------------------------
    [deleteLoads.fulfilled]: (state, { payload: id }) => {
      state.loads = state.loads.filter((item) => item._id !== id);
      state.is_loading = false;
    },

    [deleteLoads.pending]: (state, action) => {
      state.is_loading = false;
    },
    [deleteLoads.rejected]: (state, action) => {
      state.error = true;
      state.error_message = "something wrong";
      state.is_loading = false;
    },
    // // change  status  --------------------------------------
    [changeLoadStatus.fulfilled]: (state, action) => {
      const { id, visible } = action.payload;
      state.loads = state.loads.map((item) =>
        item._id == id ? { ...item, visible } : item
      );
      state.load = { ...state.load, visible };
    },

    [changeLoadStatus.pending]: (state, action) => {
      state.is_loading = true;
    },
    [changeLoadStatus.rejected]: (state, action) => {
      state.error = true;
      state.error_message = "something wrong";
      state.is_loading = false;
    },

    // // update   --------------------------------------
    [updateLoads.fulfilled]: (state, action) => {
      const updatedData = action.payload;
      state.loads = state.loads.map((item) =>
        item._id == updatedData._id ? updatedData : item
      );
      state.load = updatedData;
    },

    [updateLoads.pending]: (state, action) => {
      state.is_loading = true;
    },
    [updateLoads.rejected]: (state, action) => {
      state.error = true;
      state.error_message = "something wrong";
      state.is_loading = false;
    },
  },
});
export const { getLoadById, setSearchLoadTerm } = loadsSlice.actions;
export default loadsSlice.reducer;
