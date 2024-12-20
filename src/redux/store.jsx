import { configureStore } from "@reduxjs/toolkit";
import { pdfReducer } from "./Reducers/pdfReducers";

 export const store = configureStore({
  reducer: {
    pdfViewer:pdfReducer,
  },
});

