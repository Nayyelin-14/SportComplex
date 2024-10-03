const { validationResult } = require("express-validator");

const Users = require("../models/users");
const Booking = require("../models/Booking/bookingInfo");

exports.createBooking = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      isSuccess: false,
      message: errors.array()[0].msg,
    });
  }
  try {
    const { sporttype, session, status, studentid, name, phone, role } =
      req.body;
    // console.log(role);
    // const { USER_ID } = req;

    if (status === "restricted") {
      throw new Error("Your account has been restricted!!!");
    }
    if (role === "Admin") {
      throw new Error("Something went wrong!!!");
    }
    // console.log(USER_ID);
    // const Booking_User = await Users.findById(USER_ID).select("role");
    // console.log(Booking_User);
    const bookingDoc = await Booking.create({
      sporttype,
      session,
      status,
      studentid,
      name,
      phone,
      role,
      bookingUser_id: req.USER_ID,
    });

    if (!bookingDoc) {
      throw new Error("Failed to get booking");
    }
    //     console.log("booking", bookingDoc);
    return res.status(200).json({
      isSuccess: true,
      message: "Booked successfully",
      bookingDoc,
    });
  } catch (error) {
    return res.status(400).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.getAllbookings = async (req, res) => {
  try {
    const Allbookings = await Booking.find();

    if (!Allbookings) {
      throw new Error("Something went wrong");
    }
    // console.log("allbookings", Allbookings);
    return res.status(200).json({
      isSuccess: true,
      message: "Bookings fetched",
      Allbookings,
    });
  } catch (error) {
    return res.status(422).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

// Get all bookings for each sport type and session
exports.getBookings = async (req, res) => {
  const { sportType } = req.params;
  // console.log(req.USER_ID);
  try {
    // Fetch all bookings for the given sport type
    const bookings = await Booking.find({ sporttype: sportType });

    // Group bookings by session
    const sessions = [
      "8:00 - 10:00",
      "10:00 - 12:00",
      "1:00 - 3:00",
      "3:00 - 5:00",
      "5:00 - 7:00",
      "7:00 - 9:00",
    ];

    // Initialize the groupedBookings object
    const groupedBookings = {};
    sessions.forEach((session) => {
      groupedBookings[session] = []; // Initialize each session with an empty array
    });

    // Loop through each booking and group by session
    bookings.forEach((booking) => {
      const session = booking.session;
      if (groupedBookings[session]) {
        groupedBookings[session].push({
          name: booking.name,
          phone: booking.phone,
          studentid: booking.studentid,
          status: booking.status,
        });
      }
    });
    // console.log(groupedBookings);
    res.status(200).json({
      isSuccess: true,
      message: `Bookings for ${sportType} fetched successfully`,
      bookings: groupedBookings, // Grouped by session
    });
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      message: error.message,
    });
  }
};
