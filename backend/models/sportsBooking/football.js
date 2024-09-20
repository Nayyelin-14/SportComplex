const { Schema, modal } = require("mongoose");

const footballSchema = Schema.create({
  Booking_user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  session: {
    required: true,
    type: String,
  },
  user_phNumber: {
    required: true,
    type: String,
  },
  sport_type: {
    type: String,
    required: true,
  },
});
