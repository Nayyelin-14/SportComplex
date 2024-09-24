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

exports.deleteUser = async (req, res) => {
  const { userID } = req.params;
  try {
    const delete_User = await Users.findByIdAndDelete(userID);

    if (!delete_User) {
      throw new Error("User not found");
    }
    return res.status(200).json({
      isSuccess: true,
      message: "Deleted a member",
    });
  } catch (error) {
    return res.status(404).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.restrictUser = async (req, res) => {
  const { userID } = req.params;
  try {
    const restrict_User = await Users.findById(userID);

    if (!restrict_User) {
      throw new Error("User not found");
    }

    restrict_User.status = "restricted";
    await restrict_User.save();

    return res.status(200).json({
      isSuccess: true,
      message: "Restricted a member",
      restrict_User,
    });
  } catch (error) {
    return res.status(404).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.UnrestrictUser = async (req, res) => {
  const { userID } = req.params;
  try {
    const Unrestrict_User = await Users.findById(userID);

    if (!Unrestrict_User) {
      throw new Error("User not found");
    }

    Unrestrict_User.status = "active";
    await Unrestrict_User.save();

    return res.status(200).json({
      isSuccess: true,
      message: "Unrestricted a member",
      Unrestrict_User,
    });
  } catch (error) {
    return res.status(404).json({
      isSuccess: false,
      message: error.message,
    });
  }
};
