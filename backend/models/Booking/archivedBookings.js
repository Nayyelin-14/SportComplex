// const { Schema, model } = require("mongoose");

// const archivedBookingSchema = new Schema(
//   {
//     name: {
//       required: true,
//       type: String,
//     },
//     bookingUser_id: {
//       type: Schema.Types.ObjectId,
//       ref: "Users",
//       required: true,
//     },
//     sporttype: {
//       required: true,
//       type: String,
//     },
//     phone: {
//       required: true,
//       type: Number,
//     },
//     session: {
//       required: true,
//       type: String,
//     },
//     studentid: {
//       required: true,
//       type: Number,
//     },
//     status: {
//       required: true,
//       type: String,
//     },
//     role: {
//       required: true,
//       type: String,
//     },
//     trainer: {
//       type: Schema.Types.ObjectId,
//       ref: "trainers",
//       default: null,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// archivedBookingSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });
// const archivedBookingModel = model("ArchivedBooking", archivedBookingSchema);
// module.exports = archivedBookingModel;
const { Schema, model } = require("mongoose");

const archivedBookingSchema = new Schema(
  {
    name: { type: String, required: true },
    bookingUser_id: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    sporttype: { type: String, required: true },
    phone: { type: Number, required: true },
    session: { type: String, required: true },
    studentid: { type: Number, required: true },
    status: { type: String, required: true },
    role: { type: String, required: true },
    trainer: { type: Schema.Types.ObjectId, ref: "trainers", default: null },
  },
  { timestamps: true }
);

// TTL Index
archivedBookingSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

// Ensure indexes are up-to-date
const archivedBookingModel = model("ArchivedBooking", archivedBookingSchema);
archivedBookingModel.syncIndexes(); // Sync indexes to ensure TTL is applied

module.exports = archivedBookingModel;
