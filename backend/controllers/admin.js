const Users = require("../models/users");
const Booking = require("../models/Booking/bookingInfo");
exports.getAllUsers = async (req, res) => {
  try {
    const allusers_DOC = await Users.find().select(
      "username email createdAt status role"
    );

    if (!allusers_DOC) {
      throw new Error("Users not found!!!");
    }
    return res.status(200).json({
      isSuccess: true,
      message: "Fetched all users",
      allusers_DOC,
    });
  } catch (error) {
    return res.status(404).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.getallBookings = async (req, res) => {
  try {
    const allBookings_doc = await Booking.find().select(
      "name phone createdAt status studentid sporttype session createdAt"
    );

    if (!allBookings_doc) {
      throw new Error("Bookings not found!!!");
    }
    return res.status(200).json({
      isSuccess: true,
      message: "Fetched all bookings",
      allBookings_doc,
    });
  } catch (error) {
    return res.status(404).json({
      isSuccess: false,
      message: error.message,
    });
  }
};
