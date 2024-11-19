const { Schema, model } = require("mongoose");

const newsSchema = new Schema(
  {
    title: {
      type: String,
      // required: true,
    },
    profileImage: {
      type: [String],
      default: [],
    },
    detail: {
      type: String,
      // required: true,
    },
    featuredline: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

const newsModel = model("News", newsSchema);
module.exports = newsModel;
