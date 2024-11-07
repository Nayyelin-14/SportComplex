const { Schema, model } = require("mongoose");

const trainersSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },

    trainer_description: {
      required: true,
      type: String,
    },
    specailization: {
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
