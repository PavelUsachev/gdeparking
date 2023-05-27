import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/axios";

export const getCamera = createAsyncThunk("getCamera", async (camera_id) => {
  const { data } = await axiosInstance.get(`/camera/${camera_id}`);
  return data;
});

export const getCameras = createAsyncThunk("getCameras", async () => {
  const { data } = await axiosInstance.get("/camera/all");
  return data;
});

const initialState = {
  camera: [],
  cameras: [],
  loaders: {
    common: false,
  },
};

const cameraSlice = createSlice({
  name: "camera",
  initialState,
  extraReducers: (builder) => {
    //getCamera
    builder.addCase(getCamera.pending, (state) => {
      state.loaders.common = true;
    });
    builder.addCase(getCamera.fulfilled, (state, { payload }) => {
      state.camera = payload;
      state.loaders.common = false;
    });
    builder.addCase(getCamera.rejected, (state, { error }) => {
      state.loaders.common = false;
      console.log(error);
    });
    //getCameras
    builder.addCase(getCameras.pending, (state) => {
      state.loaders.common = true;
    });
    builder.addCase(getCameras.fulfilled, (state, { payload }) => {
      state.cameras = payload;
      state.loaders.common = false;
    });
    builder.addCase(getCameras.rejected, (state, { error }) => {
      state.loaders.common = false;
      console.log(error);
    });
  },
});

export const { selectedCard, selectedCardById } = cameraSlice.actions;

export default cameraSlice.reducer;
