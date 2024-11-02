const { Schema, model } = require("mongoose");

const usersSchema = new Schema(
  {
    username: {
      required: true,

      type: String,
    },
    email: {
      required: true,
      type: String,
      trim: true,
    },
    password: {
      required: true,
      type: String,
    },
    memberID: {
      required: true,
      type: Number,
    },
    phnumber: {
      required: true,
      type: Number,
    },
    status: {
      type: String,
      default: "active",
    },
    role: {
      type: String,
      required: true,
    },
    lastEditTime: {
      type: Date,
      default: null,
    },
    profileImage: {
      default: null,
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const usersModel = model("Users", usersSchema);
module.exports = usersModel;
// phnumber : phnumber ,
// studentID
