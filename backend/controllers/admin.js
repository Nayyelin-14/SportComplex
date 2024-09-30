const Users = require("../models/users");
const Booking = require("../models/Booking/bookingInfo");
const News = require("../models/newsModel");
const path = require("path");
const fs = require("fs");

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
      delete_User
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

// Add New
exports.addNew = async (req, res) => {
  try {
    let news = await News.find({});
    let id;

    const { title, image, detail, featuredline } = req.body;

    if (news.length > 0) {
      const lastnew = news.slice(-1)[0];
      id = lastnew.id + 1;
    } else {
      id = 1;
    }

    const addnew = new News({
      id: id,
      title,
      image,
      detail,
      featuredline,
    });

    await addnew.save();
    return res.status(200).json({
      isSuccess: true,
      message: "News added successfully",
      data: addnew,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
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
    console.log("Image Path:", imagePath);

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