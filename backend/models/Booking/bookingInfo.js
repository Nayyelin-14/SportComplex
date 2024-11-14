const { Schema, model } = require("mongoose");

const bookingSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    bookingUser_id: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    sporttype: {
      required: true,
      type: String,
    },
    phone: {
      required: true,
      type: Number,
    },
    session: {
      required: true,
      type: String,
    },
    studentid: {
      required: true,
      type: Number,
    },
    status: {
      required: true,
      type: String,
    },
    role: {
      required: true,
      type: String,
    },
    trainer: {
      type: Schema.Types.ObjectId,
      ref: "trainers",
      default: null,
    },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt fields automatically
  }
);

// Add TTL index on the createdAt field to expire documents after 1 day (86400 seconds)
bookingSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

const bookingModel = model("Booking", bookingSchema);
module.exports = bookingModel;
