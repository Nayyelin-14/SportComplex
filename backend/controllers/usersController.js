const archivedBookings = require("../models/Booking/archivedBookings");
const Users = require("../models/users");

exports.getUserHistory = async (req, res) => {
  const { userId } = req.params;
  try {
    const booking_history = await archivedBookings.find({
      bookingUser_id: userId,
    });

    if (!booking_history) {
      throw new Error("No Booking History");
    }
    return res.status(200).json({
      isSuccess: true,
      message: "Booking history are fetched",
      booking_history,
    });
  } catch (error) {
    return res.status(404).json({
      isSuccess: false,
      message: error.message,
    });
  }
};
