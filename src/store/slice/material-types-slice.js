import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import rootClient from "../../config/rootClient";

const initialState = {
  is_loading: false,
  error: false,
  error_message: null,
  totalPage: "",
  numberOfPage: "",
  materials: [],
  material: {
    material_name: "",
  },
};

export const getMaterials = createAsyncThunk(
  "get-materials",
  async (page, { rejectWithValue }) => {
    try {
      const response = await rootClient.get(
        `api/v1/admin/materials?page=${page}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// search api--------------
export const searchMaterial = createAsyncThunk(
  "search-material",
  async (value, { rejectWithValue }) => {
    try {
      const response = await rootClient.get(`api/v1/admin/materials/${value}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createMaterials = createAsyncThunk(
  "create-materials",
  async (body, { getState, rejectWithValue }) => {
    const { material_types } = getState();
    const { material } = material_types;
    try {
      const response = await rootClient.post(
        "api/v1/admin/materials",
        material
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteMaterials = createAsyncThunk(
  "delete-materials",
  async (id, { rejectWithValue }) => {
    try {
      const response = await rootClient.delete(`api/v1/admin/materials/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateMaterials = createAsyncThunk(
  "update-materials",
  async (data, { getState, rejectWithValue }) => {
    const { material_types } = getState();
    const { material } = material_types;
    try {
      const response = await rootClient.put(
        `api/v1/admin/materials/${material._id}`,
        material
      );
      return material;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const changeMaterialStatus = createAsyncThunk(
  "change-material-status",
  async (data, { rejectWithValue }) => {
    const { id, visible } = data;
    try {
      const response = await rootClient.put(`api/v1/admin/materials/${id}`, {
        visible,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const materialsSlice = createSlice({
  name: "materials",
  initialState,
  reducers: {
    getMaterialById(state, action) {
      state.material = state.materials.find(
        (item) => item._id === action.payload
      );
    },
    setMaterialName(state, action) {
      state.material.material_name = action.payload;
    },
  },

  extraReducers: {
    // get -------------------------------------------
    [getMaterials.fulfilled]: (state, action) => {
      state.materials = action.payload.materials;
      state.totalPage = action.payload.total;
      state.numberOfPage = action.payload.numberOfPage;
      state.is_loading = false;
    },
    [getMaterials.pending]: (state) => {
      state.is_loading = true;
    },
    [getMaterials.rejected]: (state, action) => {
      state.is_loading = false;
      state.error_message = "Something Wrong";
    },
    // search ----------------
    [searchMaterial.fulfilled]: (state, action) => {
      state.materials = action.payload.material;
      state.totalPage = action.payload.total;
      state.numberOfPage = action.payload.numberOfPage;
      state.is_loading = false;
    },
    [searchMaterial.pending]: (state, action) => {
      state.is_loading = false;
    },
    [searchMaterial.rejected]: (state, action) => {
      state.is_loading = false;
    },

    // create  -------------------------------------------
    [createMaterials.fulfilled]: (state, action) => {
      state.materials = [action.payload.material, ...state.materials];
      state.is_loading = false;
    },
    [createMaterials.pending]: (state) => {
      state.is_loading = true;
    },
    [createMaterials.rejected]: (state, action) => {
      state.is_loading = false;
      state.error = true;
      state.errorMessage = "Material Exist !";
    },
    // delete  --------------------------------------
    [deleteMaterials.fulfilled]: (state, { payload: id }) => {
      state.materials = state.materials.filter((item) => item._id !== id);
      state.is_loading = false;
    },

    [deleteMaterials.pending]: (state, action) => {
      state.is_loading = true;
    },
    [deleteMaterials.rejected]: (state, action) => {
      state.error = true;
      state.is_loading = false;
    },
    // change  status  --------------------------------------
    [changeMaterialStatus.fulfilled]: (state, action) => {
      const { id, visible } = action.payload;
      state.materials = state.materials.map((item) =>
        item._id === id ? { ...item, visible } : item
      );
      state.material = { ...state.material, visible };
    },

    [changeMaterialStatus.pending]: (state, action) => {
      state.is_loading = true;
    },
    [changeMaterialStatus.rejected]: (state, action) => {
      state.error = true;
      state.is_loading = false;
    },

    // update   --------------------------------------
    [updateMaterials.fulfilled]: (state, action) => {
      const updatedData = action.payload;
      state.materials = state.materials.map((item) =>
        item._id === updatedData._id ? updatedData : item
      );
      state.material = updatedData;
    },

    [updateMaterials.pending]: (state, action) => {
      state.is_loading = true;
    },
    [updateMaterials.rejected]: (state, action) => {
      state.error_message = true;
      state.is_loading = false;
    },
  },
});
export const { getMaterialById, addMaterial, setMaterialName } =
  materialsSlice.actions;
export default materialsSlice.reducer;
