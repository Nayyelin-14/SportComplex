const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/auth");
const adminController = require("../controllers/admin");
const adminMiddlware = require("../Middleware/isadmin");

router.get(
  "/admin/allusers",
  authMiddleware,
  authMiddleware,
  adminController.getAllUsers
);

router.get(
  "/admin/allbookings",
  authMiddleware,
  adminMiddlware,
  adminController.getallBookings
);

module.exports = router;
