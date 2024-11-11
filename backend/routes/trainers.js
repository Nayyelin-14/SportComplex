const express = require("express");
const router = express.Router();
const trainerController = require("../controllers/trainers");
const authmiddleware = require("../Middleware/auth");
router.get(
  "/trainer-details/:trainer_ID",
  authmiddleware,
  trainerController.gettrainerDetails
);
module.exports = router;
