const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const Users = require("../models/users");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
//create new user when register success
exports.registerNewUser = async (req, res) => {
  const errors = validationResult(req);
  // console.log(errors.array()[0]);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      isSuccess: false,
      message: errors.array()[0].msg,
    });
  }

  const { username, email, password, role, phnumber, memberid } = req.body;
  // console.log(username, email, password, role, phnumber, memberid);

  const emailPattern = /^[0-9]{10}@lamduan\.mfu\.ac\.th$/;
  const adminEmailPattern = /^[0-9]{10}@lamduan\.mfu\.admin\.ac\.th$/;
  try {
    const created_User = await Users.findOne({ email: email });
    if (created_User) {
      throw new Error("User has already existed");
    }

    if (role === "Admin") {
      if (!adminEmailPattern.test(email)) {
        return res.status(400).json({
          isSuccess: false,
          message:
            "Invalid email format. Must be in the form of MFU admin email",
        });
      }
    } else {
      if (!emailPattern.test(email)) {
        return res.status(400).json({
          isSuccess: false,
          message: "Invalid email format. Must be in the form of MFU email",
        });
      }
    }

    // The test() method in JavaScript is used with regular expressions to check if a pattern exists within a given string. It returns a Boolean value: true if the pattern is found and false if it is not.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //     salt: Adding a salt to the hashing process ensures that even if two users have the same password, their hashed passwords will be different due to the unique salts.
    const create_NewUser = await Users.create({
      email: email,
      username: username,
      password: hashedPassword,
      role: role,
      phnumber: phnumber,
      memberID: memberid,
    });
    return res.status(200).json({
      isSuccess: true,
      message: "New account has created successfully",
      newUser: create_NewUser,
    });
  } catch (error) {
    return res.status(400).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

//login
exports.loginAccount = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      isSuccess: false,
      message: errors.array()[0].msg,
    });
  }
  const { email, password } = req.body;
  try {
    const LogIn_Account = await Users.findOne({ email: email });
    if (!LogIn_Account) {
      throw new Error("Email not found!!!");
    }

    const isPassword_Match = await bcrypt.compare(
      password,
      LogIn_Account.password
    );
    if (!isPassword_Match) {
      throw new Error("Incorrect password!!!");
    }
    console.log("login", LogIn_Account);
    //set token after email and password are ok
    const jwt_token = jwt.sign(
      { userID: LogIn_Account._id, role: LogIn_Account.role },
      process.env.JWT_KEY,

      { expiresIn: "1d" }
    );
    return res.status(201).json({
      isSuccess: true,
      message: "Successfully logged In",
      token: jwt_token,
      LogIn_Account,
      user: { role: LogIn_Account.role },
    });
  } catch (error) {
    return res.status(400).json({
      isSuccess: false,
      message: error.messsage,
    });
  }
};

exports.checkCurrentUser = async (req, res) => {
  const { USER_ID } = req;
  // console.log(USER_ID);
  try {
    const CurrentLoginUser = await Users.findById(USER_ID).select(
      "email role status username memberID phnumber lastEditTime"
    );
    if (!CurrentLoginUser) {
      throw new Error("Unauthorized user found");
    }

    return res.json({
      isSuccess: true,
      currentUser: CurrentLoginUser,
      message: "Authorized User",
    });
  } catch (error) {
    return res.status(400).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  const { USER_ID } = req; // Assuming USER_ID is passed correctly from middleware
  const { username, email, role, phnumber, memberid, lastEditTime } = req.body;
  let secureUrlArray = [];
  const profileImages = req.files || []; // Array of files from multer

  try {
    const userDoc = await Users.findById(USER_ID);

    // Ensure profileImage is an array
    if (!Array.isArray(userDoc.profileImage)) {
      userDoc.profileImage = [];
    }

    // Upload images to Cloudinary
    const uploadPromises = profileImages.map(
      (img) =>
        new Promise((resolve, reject) => {
          cloudinary.uploader.upload(img.path, (err, result) => {
            if (err) {
              reject(new Error("Cloudinary upload failed."));
            } else {
              secureUrlArray.push(result.secure_url);
              resolve();
            }
          });
        })
    );

    // Wait for all images to upload
    await Promise.all(uploadPromises);

    // Update the user document with the secure URLs of uploaded images
    const update_userDoc = await Users.findByIdAndUpdate(
      USER_ID,
      {
        username,
        email,
        role,
        phnumber,
        memberID: memberid,
        lastEditTime: new Date(),
        // $push: { profileImage: { $each: secureUrlArray } }, // Using $each for array
        $push: { profileImage: secureUrlArray },
      },
      { new: true }
    );
    // console.log(update_userDoc);
    if (!update_userDoc) {
      throw new Error("User update failed.");
    }

    return res.status(200).json({
      isSuccess: true,
      message: "Updated successfully",
      update_userDoc,
    });
  } catch (error) {
    return res.status(400).json({
      isSuccess: false,
      message: error.message,
    });
  }
};
