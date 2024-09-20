import React from "react";
import { useSelector } from "react-redux";

const BookingFrom = () => {
  const { selectedTime } = useSelector((state) => state.booking);
  const { SportType } = useSelector((state) => state.booking);
  return (
    <div>
      BookingFrom{selectedTime}-{SportType}
    </div>
  );
};

export default BookingFrom;
