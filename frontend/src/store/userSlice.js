import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  user: null,
  userImages: [],
};

export const UserSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setImages: (state, action) => {
      state.userImages = action.payload;
    },
  },
});

export const { setUser, setImages } = UserSlice.actions;
export default UserSlice.reducer;
