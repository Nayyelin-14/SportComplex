const archivedBookings = require("../models/Booking/archivedBookings");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;
const Users = require("../models/users");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
exports.getUserHistory = async (req, res) => {
  const { USER_ID } = req;
  const { userId } = req.params;

  try {
    const booking_history = await archivedBookings.find({
      bookingUser_id: userId,
    });

    if (!booking_history) {
      throw new Error("No Booking History");
    }

    if (USER_ID !== userId) {
      throw new Error("Unauthorized!!!");
    }
    const currentUser_doc = await Users.findById(userId);
    if (!currentUser_doc) {
      throw new Error("User not found");
    }

    return res.status(200).json({
      isSuccess: true,
      message: "Booking history are fetched",
      booking_history,
      currentUser_doc,
    });
  } catch (error) {
    return res.status(404).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.deletePhotos = async (req, res) => {
  try {
    const { user_ID } = req.params;
    const deleteImageID = req.body.deleteimgID;

    if (!deleteImageID) {
      return res
        .status(400)
        .json({ isSuccess: false, message: "Image ID is required" });
    }

    const decodedImageID = decodeURIComponent(deleteImageID);

    const public_ID_ToDelete = decodedImageID.substring(
      decodedImageID.lastIndexOf("/") + 1,
      decodedImageID.lastIndexOf(".")
    );

    // Cloudinary deletion
    await cloudinary.uploader.destroy(public_ID_ToDelete);

    // Remove image from user's profile in database
    const user = await Users.findByIdAndUpdate(
      user_ID,
      { $pull: { profileImage: decodedImageID } },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ isSuccess: false, message: "User not found" });
    }

    return res.status(200).json({
      isSuccess: true,
      message: "Image successfully deleted",
    });
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: "An error occurred while deleting the image",
    });
  }
};

exports.changePassword = async (req, res) => {
  const { userid } = req.params;
  const { oldpass, confirmpass, newpass } = req.body;

  try {
    const userdoc = await Users.findById(userid);
    if (!userdoc) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare oldpass with the hashed password in the database
    const isMatch = await bcrypt.compare(oldpass, userdoc.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Old password does not match" });
    }

    if (newpass !== confirmpass) {
      return res
        .status(400)
        .json({ message: "Confirm password does not match" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newpass, salt);

    // Update the user's password in the database
    userdoc.password = hashedNewPassword;
    await userdoc.save();

    return res.status(200).json({
      isSuccess: true,
      message: "Password updated successfully",
      userdoc,
    });
  } catch (error) {
    return res.status(500).json({ isSuccess: false, message: error.message });
  }
};
