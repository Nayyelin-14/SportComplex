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
    role: {
      default: "user",
      type: String,
    },
    status: {
      type: String,
      default: "active",
    },
    role: {
      type: String,
      default: "Student",
    },
  },
  {
    timestamps: true,
  }
);

const usersModel = model("Users", usersSchema);
module.exports = usersModel;
