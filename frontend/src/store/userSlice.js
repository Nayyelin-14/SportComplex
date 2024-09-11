import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  user: null,
};

export const UserSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = UserSlice.actions;
export default UserSlice.reducer;
