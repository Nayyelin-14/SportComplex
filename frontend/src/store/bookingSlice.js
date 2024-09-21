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
    // setBooking: (state, action) => {
    //   state.successBooking = action.payload;
    // },
  },
});

export const { setSelectedTime, setSportType } = BookingSlice.actions;
export default BookingSlice.reducer;