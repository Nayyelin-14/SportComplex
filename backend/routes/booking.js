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
      // .if((value, { req }) =>
      //   ["Student", "Staff", "Lecturer"].includes(req.body.role)
      // )
      .trim()
      .notEmpty()
      .withMessage("Enter valid id")
      .isLength({ min: 8 })
      .withMessage("ID must be valid"),
  ],
  authMiddleware,

  bookingController.createBooking
);

router.get("/getAllbookings", bookingController.getAllbookings);

router.get(
  "/booking/:sportType",
  authMiddleware,
  bookingController.getBookings
);

router.get("/alltrainers", authMiddleware, bookingController.getAlltrainers);

module.exports = router;
