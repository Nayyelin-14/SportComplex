const {Schema, model} = require("mongoose");

const newsSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    detail: {
        type: String,
        required: true,
    },
    featuredline: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    }
});

const newsModel = model("News", newsSchema);
module.exports = newsModel;