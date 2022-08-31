import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import rootClient from "../../config/rootClient";

const initialState = {
  is_loading: false,
  success: false,
  error: false,
  error_message: null,
  totalPage: "",
  numberOfPage: "",
  values: [],
  value: {
    key: "",
    value: "",
  },
};

export const getValues = createAsyncThunk(
  "get-setting-key-value",
  async (page, { rejectWithValue }) => {
    try {
      const response = await rootClient.get(`api/v1/admin/values?page=${page}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createValues = createAsyncThunk(
  "create-setting-key-value",
  async (body, { getState, rejectWithValue }) => {
    const { settings } = getState();
    const { value } = settings;
    try {
      const response = await rootClient.post("api/v1/admin/values", value);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteValues = createAsyncThunk(
  "delete-key-value",
  async (id, { rejectWithValue }) => {
    try {
      const response = await rootClient.delete(`api/v1/admin/values/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update-----------------
export const updateValues = createAsyncThunk(
  "update-settings-key-value",
  async (data, { getState, rejectWithValue }) => {
    const { settings } = getState();
    const { value } = settings;
    try {
      const response = await rootClient.put(
        `api/v1/admin/values/${value._id}`,
        value
      );
      return value;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/// change status----------------
export const changeSettingsStatus = createAsyncThunk(
  "setting-key-value-status-changer",
  async (data, { rejectWithValue }) => {
    const { id, visible } = data;
    try {
      const response = await rootClient.put(`api/v1/admin/values/${id}`, {
        visible,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    getSettingById(state, action) {
      state.value = state.values.find((item) => item._id === action.payload);
    },
    setKey(state, action) {
      state.value.key = action.payload;
    },
    setValue(state, action) {
      state.value.value = action.payload;
    },
  },
  extraReducers: {
    // get -------------------------------------------
    [getValues.fulfilled]: (state, action) => {
      state.values = action.payload.value;
      state.totalPage = action.payload.total;
      state.numberOfPage = action.payload.numberOfPage;
      state.is_loading = false;
    },
    [getValues.pending]: (state, action) => {
      state.is_loading = true;
      state.error_message = null;
    },
    [getValues.rejected]: (state, action) => {
      state.is_loading = false;
      state.error_message =
        "Something wrong please check your internet connection";
    },

    // create ---------
    [createValues.fulfilled]: (state, action) => {
      state.values = [action.payload.value, ...state.values];
      state.success = true;
      state.is_loading = false;
    },
    [createValues.pending]: (state, action) => {
      state.is_loading = true;
      state.error_message = null;
    },
    [createValues.rejected]: (state, action) => {
      state.is_loading = false;
      state.error_message =
        "Something wrong please check your internet connection";
    },

    // delete  --------------------------------------
    [deleteValues.fulfilled]: (state, { payload: id }) => {
      state.values = state.values.filter((item) => item._id !== id);
      state.is_loading = false;
    },
    [deleteValues.pending]: (state, { payload: id }) => {
      state.is_loading = true;
    },

    [deleteValues.rejected]: (state, action) => {
      state.is_loading = false;
    },

    // update   --------------------------------------
    [updateValues.fulfilled]: (state, action) => {
      const updatedData = action.payload;
      state.values = state.values.map((item) =>
        item._id === updatedData._id ? updatedData : item
      );
      state.value = updatedData;
      state.is_loading = false;
    },
    [updateValues.pending]: (state, action) => {
      state.is_loading = true;
    },

    [updateValues.rejected]: (state, action) => {
      state.is_loading = false;
    },

    // change  status  --------------------------------------
    [changeSettingsStatus.fulfilled]: (state, action) => {
      const { id, visible } = action.payload;
      state.values = state.values.map((item) =>
        item._id === id ? { ...item, visible } : item
      );
      state.value = { ...state.value, visible };
      state.is_loading = false;
    },
    [changeSettingsStatus.pending]: (state, action) => {
      state.is_loading = true;
    },
    [changeSettingsStatus.rejected]: (state, action) => {
      state.is_loading = false;
      state.error = true;
    },
  },
});

export const { getSettingById, setKey, setValue } = settingsSlice.actions;
export default settingsSlice.reducer;
