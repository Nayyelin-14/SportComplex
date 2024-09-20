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
    const { sporttype, session, status, studentid, name, phone } = req.body;

    const bookingDoc = await Booking.create({
      sporttype,
      session,
      status,
      studentid,
      name,
      phone,
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
    if (Allbookings.length) {
      return res.status(200).json({
        isSuccess: true,
        message: "Bookings fetched",
        Allbookings,
      });
    }
    console.log("allbookings", Allbookings);
  } catch (error) {
    return res.status(422).json({
      isSuccess: false,
      message: error.message,
    });
  }
};
