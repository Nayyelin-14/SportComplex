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
  },
  {
    timestamps: true,
  }
);

const archivedBookingModel = model("ArchivedBooking", archivedBookingSchema);
module.exports = archivedBookingModel;
