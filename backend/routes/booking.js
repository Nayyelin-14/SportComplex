const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authMiddleware = require("../Middleware/auth");
const bookingController = require("../controllers/booking");

router.post(
  "/createBooking",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Enter name")
      .isLength({ min: 4 })
      .withMessage("Name must have at least 4 characters"),
    body("phone")
      .trim()
      .notEmpty()
      .withMessage("Enter phone number")
      .isLength({ min: 8 })
      .withMessage("Phone number must have at least 8 characters"),
    body("studentid")
      .trim()
      .notEmpty()
      .withMessage("Enter valid id")
      .isLength({ min: 8 })
      .withMessage("ID must be valid"),
  ],
  authMiddleware,

  bookingController.createBooking
);

router.get("/getAllbookings", authMiddleware, bookingController.getAllbookings);

module.exports = router;
