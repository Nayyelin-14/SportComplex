const { Schema, model } = require("mongoose");

const trainersSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    bookingUser_id: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      default: null,
    },
    booking_ID: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
    },
    trainer_description: {
      required: true,
      type: String,
    },
    sporttype: {
      required: true,
      type: String,
    },
    qualification: {
      required: true,
      type: String,
    },
    experience: {
      required: true,
      type: String,
    },
    availability: {
      default: true,
      type: Boolean,
    },
    taken: {
      default: false,
      type: Boolean,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      required: true,
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const trainersModel = model("trainers", trainersSchema);
module.exports = trainersModel;
