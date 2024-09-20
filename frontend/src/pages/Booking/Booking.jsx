import React, { useEffect, useState } from "react";
import BookingIndex from "../../components/sportBooking/BookingIndex";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getAll_Bookings } from "../../apiEndpoints/booking";
import { message } from "antd";

const Booking = () => {
  // const { successBooking } = useSelector((state) => state.booking);
  // const { selectedTime } = useSelector((state) => state.booking);
  // console.log(successBooking.name);
  // const location = useLocation();
  // const { bookingDoc } = location.state || {};
  // console.log(bookingDoc);
  const [bookings, setBookings] = useState([]);
  const displayBookings = async () => {
    try {
      const response = await getAll_Bookings();
      if (response.isSuccess) {
        message.success(response.message);
        setBookings((prev) => [...prev, response.Allbookings]);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    displayBookings();
  }, []);
  console.log(bookings);

  return (
    <div className="mb-96">
      <BookingIndex bookings={bookings} />
    </div>
  );
};

export default Booking;
