const { Schema, model } = require("mongoose");

const trainerAvailabilitySchema = new Schema(
  {
    trainer: {
      type: Schema.Types.ObjectId,
      ref: "trainers",
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
    timestamps: true, // This adds createdAt and updatedAt fields automatically
  }
);

// Add TTL index on the createdAt field to expire documents after 1 day (86400 seconds)
trainerAvailabilitySchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 86400 }
);

const TrainerAvailability = model(
  "trainerAvailability",
  trainerAvailabilitySchema
);
module.exports = TrainerAvailability;
