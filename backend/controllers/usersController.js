const archivedBookings = require("../models/Booking/archivedBookings");
const Users = require("../models/users");

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

exports.uploadProfile_image = async (req, res) => {
  const profileImg = req.files;
  const userID = req.body.editProductId;
  let secureUrlArray = [];
  // console.log(productImages);
  // console.log(productId);
  const userDOC = await Users.findOne({ _id: userID });
  console.log(userDOC);
  if (req.USER_ID !== userDOC._id) {
    throw new Error("Authorization Failed.");
  }

  try {
    // Use Promise.all to wait for all uploads to complete
    const uploadPromise = new Promise((resolve, reject) => {
      cloudinary.uploader.upload(profileImg.path, (err, result) => {
        // img.path: This is the file path to the image that you want to upload.
        if (err) {
          reject(new Error("Cloud upload Failed."));
        } else {
          secureUrlArray.push(result.secure_url);
          resolve();
          // The resolve() function is then called to indicate that the Promise has been fulfilled successfully
        }
      });
    });

    await Promise.all(uploadPromise);
    // Wait for all uploads to finish
    if (uploadPromise.length === secureUrlArray.length) {
      await Users.findByIdAndUpdate(userID, {
        $push: { images: secureUrlArray },
      });
      return res.status(200).json({
        isSuccess: true,
        message: "Product images saved.",
        secureUrlArray,
      });
    } else {
      throw new Error("Failed to upload images");
    }
  } catch (err) {
    return res.status(404).json({
      isSuccess: false,
      message: err.message,
    });
  }
};
