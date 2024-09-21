import React, { useEffect, useState } from "react";
import BookingIndex from "../../components/sportBooking/BookingIndex";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getAll_Bookings } from "../../apiEndpoints/booking";
import { message } from "antd";

const Booking = () => {
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

  return (
    <div className="mb-96">
      <BookingIndex bookings={bookings} />
    </div>
  );
};

export default Booking;
