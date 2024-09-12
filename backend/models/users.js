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
      validate: {
        validator: function (v) {
          // Strict regex for email validation
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email format!`,
      },
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
  },
  {
    timestamps: true,
  }
);

const usersModel = model("Users", usersSchema);
module.exports = usersModel;
