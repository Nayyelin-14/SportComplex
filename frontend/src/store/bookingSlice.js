import { createSlice } from "@reduxjs/toolkit";

const bookingInitialState = {
  selectedTime: null,
  SportType : null
};
export const BookingSlice = createSlice({
  name: "session",
  initialState: bookingInitialState,
  reducers: {
    setSelectedTime: (state, action) => {
      state.selectedTime = action.payload;
    },
    setSportType: (state, action) => {
      state.SportType = action.payload;
    },
  },
});

export const { setSelectedTime, setSportType } = BookingSlice.actions;
export default BookingSlice.reducer;
