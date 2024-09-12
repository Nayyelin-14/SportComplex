const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const Users = require("../models/users");

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

  const { username, email, password } = req.body;
  // console.log(username, email, password);

  const emailPattern = /^[0-9]{10}@lamduan\.mfu\.ac\.th$/;
  try {
    const created_User = await Users.findOne({ email: email });
    if (created_User) {
      throw new Error("User has already existed");
    }

    if (!emailPattern.test(email)) {
      return res.status(400).json({
        isSuccess: false,
        message: "Invalid email format. Must be in the form of MFU email",
      });
    }
    // The test() method in JavaScript is used with regular expressions to check if a pattern exists within a given string. It returns a Boolean value: true if the pattern is found and false if it is not.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //     salt: Adding a salt to the hashing process ensures that even if two users have the same password, their hashed passwords will be different due to the unique salts.
    const create_NewUser = await Users.create({
      email: email,
      username: username,
      password: hashedPassword,
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
    //set token after email and password are ok
    const jwt_token = jwt.sign(
      { userID: LogIn_Account._id },
      process.env.JWT_KEY,
      { expiresIn: "1d" }
    );
    return res.status(201).json({
      isSuccess: true,
      message: "Successfully logged In",
      token: jwt_token,
    });
  } catch (error) {
    return res.status(400).json({
      isSuccess: false,
      message: error.messsage,
    });
  }
};
