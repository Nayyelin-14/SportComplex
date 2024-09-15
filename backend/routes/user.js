const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const UserController = require("../controllers/auth");
const authMiddleware = require("../Middleware/auth");
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
  ],
  UserController.registerNewUser
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
  UserController.loginAccount
);

router.get(
  "/get-current-user",
  authMiddleware,
  UserController.checkCurrentUser
);
module.exports = router;
