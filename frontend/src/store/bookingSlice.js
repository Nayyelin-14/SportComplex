import { createSlice } from "@reduxjs/toolkit";

const bookingInitialState = {
  selectedTime: null,
  SportType: null,
  // bookingDate: null,
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
    // setBookingDate: (state, action) => {
    //   state.bookingDate = action.payload;
    // },
  },
});

export const {
  setSelectedTime,
  setSportType,
  resetSelectedTime,
  resetSportType,
  // setBookingDate,
} = BookingSlice.actions;
export default BookingSlice.reducer;
