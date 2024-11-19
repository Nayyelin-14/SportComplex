const Users = require("../models/users");
const Booking = require("../models/Booking/bookingInfo");
const News = require("../models/newsModel");
const archivedBookings = require("../models/Booking/archivedBookings");

const TrainerAvailability = require("../models/traineravailability");
const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
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
      delete_User,
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
    // console.log("to restrict", restrict_User);
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
//delete booking
exports.deleteBooking = async (req, res) => {
  const { booking_id } = req.params;

  try {
    const removeBooking = await Booking.findByIdAndDelete(booking_id);

    const removebookingDOC = await archivedBookings.findByIdAndDelete(
      booking_id
    );

    // Delete from TrainerAvailability using booking_ID field
    const remove_booking2 = await TrainerAvailability.findOneAndDelete({
      booking_ID: booking_id,
    });
    if (!removeBooking) {
      throw new Error("Booking not found!!!");
    }
    return res.status(200).json({
      isSuccess: true,
      message: "Deleted successfully!",
    });
  } catch (error) {
    return res.status(404).json({
      isSuccess: false,
      message: error.message,
    });
  }
};
// Add New
// exports.addNew = async (req, res) => {
//   try {
//     const { title, detail, featuredline } = req.body;

//     if (!req.file) {
//       return res.status(400).json({
//         isSuccess: false,
//         message: "Image is required.",
//       });
//     }

//     const image = req.file.path; // Get the file path of the uploaded image

//     const addnew = new News({
//       title,
//       image,
//       detail,
//       featuredline,
//     });

//     await addnew.save();

//     return res.status(200).json({
//       isSuccess: true,
//       message: "News added successfully",
//       data: addnew,
//     });
//   } catch (error) {
//     console.error("Error in addNew:", error.message);
//     return res.status(500).json({
//       isSuccess: false,
//       message: error.message,
//     });
//   }
// };
exports.addNew = async (req, res) => {
  const { title, detail, featuredline } = req.body;
  const profileImage = req.files || []; // Array of files from multer
  let secureUrlArray = [];

  console.log(title, detail, featuredline);
  console.log(profileImage);

  try {
    // Upload images to Cloudinary
    const uploadPromises = profileImage.map(
      (img) =>
        new Promise((resolve, reject) => {
          cloudinary.uploader.upload(img.path, (err, result) => {
            if (err) {
              reject(new Error("Cloudinary upload failed."));
            } else {
              secureUrlArray.push(result.secure_url); // Add URL to array
              resolve();
            }
          });
        })
    );

    // Wait for all images to upload
    await Promise.all(uploadPromises);

    // Create a new document
    const createNew_Doc = await News.create({
      title,
      detail,
      featuredline,
      profileImage: secureUrlArray, // Save the entire array
    });

    if (!createNew_Doc) {
      throw new Error("Creation failed.");
    }

    return res.status(200).json({
      isSuccess: true,
      message: "Created successfully",
      createNew_Doc,
    });
  } catch (error) {
    return res.status(400).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.removeNew = async (req, res) => {
  console.log("newsid received:", req.params.newsid);
  try {
    const { newsid } = req.params;
    const newToDelete = await News.findOne({ id: newsid });

    if (!newToDelete) {
      return res
        .status(404)
        .json({ success: false, message: "News not found" });
    }

    const imageUrl = newToDelete.image; // Full URL
    const imageName = path.basename(imageUrl);

    const imagePath = path.join(__dirname, "../upload/images", imageName);

    // Delete the associated image file if it exists
    if (fs.existsSync(imagePath)) {
      try {
        fs.unlinkSync(imagePath);
        console.log(`Image ${imageName} deleted successfully.`);
      } catch (err) {
        console.error("Error deleting image:", err);
      }
    } else {
      console.log(`Image file not found: ${imagePath}`);
    }

    await News.findOneAndDelete({ id: newsid });

    return res.status(200).json({
      isSuccess: true,
      message: "Deleted",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get all News
exports.getAllNews = async (req, res) => {
  try {
    let news = await News.find({});
    return res.status(200).json({
      isSuccess: true,
      message: "Fetched all news",
      news,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
