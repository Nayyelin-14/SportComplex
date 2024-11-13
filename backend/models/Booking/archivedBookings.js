const { Schema, model } = require("mongoose");

const archivedBookingSchema = new Schema(
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
    timestamps: true,
  }
);

// bookingSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });
// const bookingModel = model("Booking", bookingSchema);
// module.exports = bookingModel;

archivedBookingSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });
const archivedBookingModel = model("ArchivedBooking", archivedBookingSchema);
module.exports = archivedBookingModel;
