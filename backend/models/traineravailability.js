const { Schema, model } = require("mongoose");

const trainerAvailabilitySchema = new Schema(
  {
    trainer: {
      type: Schema.Types.ObjectId,
      ref: "trainers",
      required: true,
    },
    booking_sportType: [
      {
        type: String,
        required: true,
      },
    ],
    bookingUser_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    booking_ID: [
      {
        type: Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
    avaliable_session: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const TrainerAvailability = model(
  "trainerAvailability",
  trainerAvailabilitySchema
);
module.exports = TrainerAvailability;
