const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const AuthController = require("../controllers/auth");
const authMiddleware = require("../Middleware/auth");
const UserController = require("../controllers/usersController");
const upload = require("../utils/storageConfig");
router.post(
  "/register",
  [
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Enter username")
      .isLength({ min: 3 })
      .withMessage("Username must have at least 3 characters"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Enter password")
      .isLength({ min: 4 })
      .withMessage("Password must have at least 4 characters"),
    body("email")
      .trim()
      .normalizeEmail()
      .notEmpty()
      .withMessage("Enter email")
      .isEmail()
      .withMessage("Enter a valid email"),
    body("phnumber").trim().notEmpty().withMessage("Enter phone number"),
    body("memberid").trim().notEmpty().withMessage("Enter valid ID"),
  ],
  AuthController.registerNewUser
);

//Log into account
router.post(
  "/login",
  [
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Enter password")
      .isLength({ min: 4 })
      .withMessage("Password must have at least 4 characters"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Enter email")
      .isEmail()
      .withMessage("Enter a valid email"),
  ],
  AuthController.loginAccount
);

router.get(
  "/get-current-user",
  authMiddleware,
  AuthController.checkCurrentUser
);

router.post(
  "/updateInfo",
  [
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Enter username")
      .isLength({ min: 3 })
      .withMessage("Username must have at least 3 characters"),
    body("email")
      .trim()
      .normalizeEmail()
      .notEmpty()
      .withMessage("Enter email")
      .isEmail()
      .withMessage("Enter a valid email"),
    body("phnumber").trim().notEmpty().withMessage("Enter phone number"),
    body("memberid").trim().notEmpty().withMessage("Enter valid ID"),
  ],
  authMiddleware,

  AuthController.updateUser
);

router.get(
  "/user-profile/:userId",
  authMiddleware,
  UserController.getUserHistory
);

router.post(
  "/uploadImage",
  authMiddleware,
  upload.array("profileImage", 1),
  UserController.uploadProfile_image
);
module.exports = router;
