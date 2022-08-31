// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// // import axios from "axios";
// import rootClient from "../../config/rootClient";

// const initialState = {
//   page: "",
// };

// // get all transporters with pagination------------------------
// // export const getAllTransporter = createAsyncThunk("transporter-get-all", async (page) => {
// //     console.log("pageeee---->", page)

// //     let response = await rootClient.get(`api/v1/admin/transporters?page=${page}`);

// //     return response.data;
// //     console.log("pagination----->", response.data.numberOfPage)

// // });

// const paginationSlice = createSlice({
//   name: "pagination",
//   initialState,
//   reducers: {
//     // page: (state) => {
//     //     state.page += 1;
//     // }
//   },
//   extraReducers: {
//     // [getAllTransporter.fulfilled]: (state, action) => {
//     //     state.resultPerPage = action.payload.resultPerPage;
//     //     state.totalPage = action.payload.total;
//     //     state.numberOfPage = action.payload.numberOfPage;
//     // }
//   },
// });
// // export const { page } = paginationSlice.actions;
// export default paginationSlice.reducer;
