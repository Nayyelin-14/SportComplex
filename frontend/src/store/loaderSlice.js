import { createSlice } from "@reduxjs/toolkit";

const loaderInitialState = {
  isProcessing: false,
};
export const LoaderSlice = createSlice({
  name: "loader",
  initialState: loaderInitialState,
  reducers: {
    setLoader: (state, action) => {
      state.isProcessing = action.payload;
    },
  },
});

export const { setLoader } = LoaderSlice.actions;
export default LoaderSlice.reducer;
