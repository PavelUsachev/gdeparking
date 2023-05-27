import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cameraSlice from "./camera";

const rootReducer = combineReducers({
  camera: cameraSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
