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
      if (!action.payload) {
        // Clear userImages if user is null
        state.userImages = [];
      }
    },
    setImages: (state, action) => {
      if (state.user) {
        state.userImages = action.payload;
      }
    },
  },
});

export const { setUser, setImages } = UserSlice.actions;
export default UserSlice.reducer;
