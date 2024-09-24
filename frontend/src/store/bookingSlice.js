import { createSlice } from "@reduxjs/toolkit";

const bookingInitialState = {
  selectedTime: null,
  SportType: null,
  // successBooking: null,
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
    resetSelectedTime: (state) => {
      state.selectedTime = null;
    },
    resetSportType: (state) => {
      state.SportType = null;
    },
  },
});

export const {
  setSelectedTime,
  setSportType,
  resetSelectedTime,
  resetSportType,
} = BookingSlice.actions;
export default BookingSlice.reducer;
