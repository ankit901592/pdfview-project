import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  pdf: [], // Store fetched data
  loading: false,
  error: null,
};
//async thunk for api calls
export const fetchPdfData = createAsyncThunk(
  "pdfViewer/fetchPdf",
  async (_, thunkApi) => {
    try {
      const response = await axios.get(
        "https://api.npoint.io/dee51ea017d20efdfcc8"
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const pdfSlice = createSlice({
  name: "pdfViewer",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPdfData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPdfData.fulfilled, (state, action) => {
        state.pdf = action.payload;
        state.loading = false;
      })
      .addCase(fetchPdfData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const pdfReducer = pdfSlice.reducer;
export const pdfAction = pdfSlice.actions;
export const pdfSelector = (state) => state.pdfViewer.pdf;
