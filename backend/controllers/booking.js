const { validationResult } = require("express-validator");

const Users = require("../models/users");
const Booking = require("../models/Booking/bookingInfo");
const Trainers = require("../models/trainers");
const trainerAvailability = require("../models/traineravailability");
const archivedBookingModel = require("../models/Booking/archivedBookings");
const trainers = require("../models/trainers");
exports.createBooking = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      isSuccess: false,
      message: errors.array()[0].msg,
    });
  }

  try {
    const {
      sporttype,
      session,
      status,
      studentid,
      name,
      phone,
      role,
      trainer,
    } = req.body;

    if (status === "restricted") {
      throw new Error("Your account has been restricted!!!");
    }
    if (role === "Admin") {
      throw new Error("Something went wrong!!!");
    }

    // Check if the trainer is already booked for the same sport and session
    const existingBooking = await trainerAvailability.findOne({
      trainer: trainer, // Use the trainer ID from req.body
      booking_sportType: sporttype,
      avaliable_session: session,
    });

    if (existingBooking) {
      return res.status(400).json({
        isSuccess: false,
        message: `The coach is already booked for ${sporttype} at ${session}. Please choose another session or proceed without a coach.`,
      });
    }

    // Create the booking after validation
    const bookingDoc = await Booking.create({
      sporttype,
      session,
      status,
      studentid,
      name,
      phone,
      role,
      bookingUser_id: req.USER_ID,
      trainer,
    });

    if (!bookingDoc) {
      throw new Error("Failed to create booking");
    }

    // Create an entry in the trainerAvailability collection
    const avaliable_Doc = await trainerAvailability.create({
      trainer: trainer, // Use trainer ID directly
      booking_sportType: sporttype,
      bookingUser_id: bookingDoc._id,
      booking_ID: bookingDoc._id,
      avaliable_session: session,
    });

    if (!avaliable_Doc) {
      throw new Error("Failed to record trainer availability");
    }

    // Archive the booking in the ArchivedBooking model
    await archivedBookingModel.insertMany(bookingDoc);

    return res.status(200).json({
      isSuccess: true,
      message: "Booked successfully",
      bookingDoc,
      avaliable_Doc,
    });
  } catch (error) {
    return res.status(400).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.getAllbookings = async (req, res) => {
  try {
    const Allbookings = await Booking.find();

    if (!Allbookings) {
      throw new Error("Something went wrong");
    }
    console.log("allbookings", Allbookings);
    return res.status(200).json({
      isSuccess: true,
      message: "Bookings fetched",
      Allbookings,
      existingBooking,
    });
  } catch (error) {
    return res.status(422).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

// Get all bookings for each sport type and session
exports.getBookings = async (req, res) => {
  const { sportType } = req.params;
  // console.log(req.USER_ID);
  try {
    // Fetch all bookings for the given sport type
    const bookings = await Booking.find({ sporttype: sportType });

    // Group bookings by session
    const sessions = [
      "8:00 - 10:00",
      "10:00 - 12:00",
      "1:00 - 3:00",
      "3:00 - 5:00",
      "5:00 - 7:00",
      "7:00 - 9:00",
    ];

    // Initialize the groupedBookings object
    const groupedBookings = {};
    sessions.forEach((session) => {
      groupedBookings[session] = []; // Initialize each session with an empty array
    });

    // Loop through each booking and group by session
    bookings.forEach((booking) => {
      const session = booking.session;
      if (groupedBookings[session]) {
        groupedBookings[session].push({
          name: booking.name,
          phone: booking.phone,
          studentid: booking.studentid,
          status: booking.status,
        });
      }
    });
    // console.log(groupedBookings);
    res.status(200).json({
      isSuccess: true,
      message: `Bookings for ${sportType} fetched successfully`,
      bookings: groupedBookings, // Grouped by session
    });
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.archiveBookings = async (req, res) => {
  try {
    // Retrieve all active bookings
    const bookings = await Booking.find();

    if (!bookings.length > 0) {
      throw new Error("Error archiving bookings");
    }
    // Insert all active bookings into the archive collection
    const archivedBooking_DOCs = await archivedBookingModel.insertMany(
      bookings
    );
    return res.status(200).json({
      isSuccess: true,
      archivedBooking_DOCs: archivedBooking_DOCs,
      message: "Bookings successfully archived.",
    });
  } catch (error) {
    return res.status(404).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.getAlltrainers = async (req, res) => {
  try {
    const trainers_doc = await trainers.find();
    if (!trainers_doc) {
      throw new Error("No trainers found!!!");
    }
    return res.status(200).json({
      isSuccess: true,
      trainers_doc,
    });
  } catch (error) {
    return res.status(404).json({
      isSuccess: false,
      message: error.message,
    });
  }
};
