import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import rootClient from "../../config/rootClient";

const initialState = {
  is_loading: false,
  error: false,
  error_message: null,
  notifications: [],
  notification: {},
  numberOfPage: "",
  input_form_data: {
    title: "",
    message: "",
    user_group: "all",
  },
};
// get all notification--------------
export const getNotifications = createAsyncThunk(
  "get-notifications",
  async (page, { rejectWithValue }) => {
    try {
      const response = await rootClient.get(
        `api/v1/admin/notifications?page=${page}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// send notification--------------
export const sendNotifications = createAsyncThunk(
  "send-fmc-notifications",
  async (body, { getState, rejectWithValue }) => {
    const { notifications } = getState();
    const { input_form_data } = notifications;
    try {
      const response = await rootClient.post(
        "api/v1/admin/notifications",
        input_form_data
      );
      return response.data.notification;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete notification--------------
export const deleteNotifications = createAsyncThunk(
  "delete-notifications",
  async (id, { rejectWithValue }) => {
    try {
      const response = await rootClient.delete(
        `api/v1/admin/notifications/${id}`
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    getNotificationById(state, action) {
      state.notification = state.notifications.find(
        (item) => item._id === action.payload
      );
    },
    setTitle(state, action) {
      state.input_form_data.title = action.payload;
    },
    setMessage(state, action) {
      state.input_form_data.message = action.payload;
    },
    setUserGroup(state, action) {
      state.input_form_data.user_group = action.payload;
    },
  },

  extraReducers: {
    // get -----------------------------------------------
    [getNotifications.fulfilled]: (state, action) => {
      state.notifications = action.payload.notification;
      state.numberOfPage = action.payload.numberOfPage;
      state.is_loading = false;
    },
    [getNotifications.pending]: (state, action) => {
      state.is_loading = true;
    },
    [getNotifications.rejected]: (state, action) => {
      state.is_loading = false;
    },

    // send ----------------------------------------------

    [sendNotifications.fulfilled]: (state, action) => {
      state.notifications = [action.payload, ...state.notifications];
      state.input_form_data = {
        title: "",
        message: "",
        user_group: "all",
      };
      state.is_loading = false;
      state.error = false;
    },
    [sendNotifications.pending]: (state, action) => {
      state.is_loading = true;
    },
    [sendNotifications.rejected]: (state, action) => {
      state.is_loading = false;
      state.error = true;
    },
    // delete ---------------------------------------------------------
    [deleteNotifications.fulfilled]: (state, { payload: id }) => {
      state.notifications = state.notifications.filter(
        (item) => item._id !== id
      );
    },
    [deleteNotifications.pending]: (state, { payload: id }) => {
      state.is_loading = true;
    },
    [deleteNotifications.rejected]: (state, { payload: id }) => {
      state.is_loading = false;
      state.error = true;
    },
  },
});
export const { getNotificationById, setMessage, setTitle, setUserGroup } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
