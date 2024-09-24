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

router.post(
  "/admin/restrict-user/:userID",
  authMiddleware,
  adminMiddlware,
  adminController.restrictUser
);

router.post(
  "/admin/unrestrict-user/:userID",
  authMiddleware,
  adminMiddlware,
  adminController.UnrestrictUser
);

router.post(
  "/admin/delete-user/:userID",
  authMiddleware,
  adminMiddlware,
  adminController.deleteUser
);

module.exports = router;
