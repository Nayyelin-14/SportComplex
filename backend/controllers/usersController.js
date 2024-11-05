const archivedBookings = require("../models/Booking/archivedBookings");
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
