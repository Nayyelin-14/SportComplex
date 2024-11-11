import React, { useState, useEffect } from "react";
import complex from "./images/complex.jpg";
import football from "./images/football.jpg";
import basketball from "./images/basketball.jpg";
import swimming from "./images/swimming.jpg";
import badminton from "./images/badminton.jpg";
import tennis from "./images/tennis.webp";
import moment from "moment";

const BookingHistory = ({ bookingshistory }) => {
  const [bookingsPerPage, setBookingsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [isAnimating, setIsAnimating] = useState(false); // Animation state

  // Function to update bookings per page based on screen size
  const updateBookingsPerPage = () => {
    if (window.innerWidth <= 576) {
      setBookingsPerPage(3);
    } else if (window.innerWidth <= 1023) {
      setBookingsPerPage(3);
    } else {
      setBookingsPerPage(4);
    }
  };

  // useEffect to handle responsive bookingsPerPage
  useEffect(() => {
    updateBookingsPerPage();

    // Add a resize event listener
    window.addEventListener("resize", updateBookingsPerPage);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", updateBookingsPerPage);
  }, []);

  // Calculate the index range for the current page
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookingshistory.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  // Handle page changes
  const totalPages = Math.ceil(bookingshistory.length / bookingsPerPage);
  const paginate = (pageNumber) => {
    setIsAnimating(true); // Trigger animation when page changes
    setTimeout(() => {
      setCurrentPage(pageNumber);
      setIsAnimating(false); // End animation after transition
    }, 300); // Match the animation duration
  };

  const checkImage = (sporttype) => {
    switch (sporttype.toLowerCase()) {
      case "football":
        return football;
      case "badminton":
        return badminton;
      case "tennis":
        return tennis;
      case "swimming":
        return swimming;
      case "basketball":
        return basketball;
      default:
        return complex; // Default image if no match is found
    }
  };

  return (
    <div>
      {/* Bookings List */}
      <div
        className={`grid gap-4 h-[500px] lg:h-[400px] mb-20 sm:mb-18 md:mb-20   ${
          bookingsPerPage === 3 ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"
        }`}
      >
        {currentBookings.map((booking) => (
          <div
            className={`sm:w-[90%]  md:w-[75%] lg:w-[100%] h-[160px] bg-gray-200 flex items-center px-4 mb-4 gap-4 transform transition-opacity duration-300 rounded-xl ${
              isAnimating ? "opacity-0" : "opacity-100"
            }`}
            key={booking._id}
          >
            <img
              src={checkImage(booking.sporttype)}
              alt={booking.sporttype}
              className="w-[45%] h-[80%] sm:w-[42%] mr-4"
            />

            <div className="flex flex-col h-full gap-3 md:gap-2">
              <h1 className="font-bold text-[13px] md:text-[15px] mt-2 text-red-900">
                {booking.sporttype}
              </h1>
              <p className="text-[13px] md:text-[15px] font-bold text-red-900">
                {booking.session}
              </p>
              <p className="text-[13px] md:text-[15px] font-bold text-red-900">
                {moment(booking.createdAt).format("MMM Do YY")}
              </p>
              {booking.trainer ? (
                <p className="text-gray-500 font-bold text-[13px] md:text-[15px]">
                  {booking.trainer.name} (Trainer)
                </p>
              ) : (
                <p className="text-gray-400 font-bold text-[13px] md:text-[15px]">
                  No trainer booked
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {/* Previous Button */}
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 mx-1 border rounded-lg ${
            currentPage === 1 ? "bg-gray-300" : "bg-red-900 text-white"
          }`}
        >
          Previous
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-3 py-1 mx-1 border rounded-lg ${
              currentPage === index + 1 ? "bg-red-900 text-white" : "bg-white"
            }`}
          >
            {index + 1}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 mx-1 border rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-300"
              : "bg-red-900 text-white "
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookingHistory;

// const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10'];
// const itemsPerPage = 3;
// const totalPages = Math.ceil(items.length / itemsPerPage); // 4 pages (10 / 3)
// const [currentPage, setCurrentPage] = useState(1);

// const indexOfLastItem = currentPage * itemsPerPage; // 3, 6, 9, ...
// const indexOfFirstItem = indexOfLastItem - itemsPerPage; // 0, 3, 6, ...
// const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

// For Page 1: currentItems = ['Item 1', 'Item 2', 'Item 3']
// For Page 2: currentItems = ['Item 4', 'Item 5', 'Item 6']
// For Page 3: currentItems = ['Item 7', 'Item 8', 'Item 9']
// For Page 4: currentItems = ['Item 10']
