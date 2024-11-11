const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");

require("dotenv").config();
const cors = require("cors");
const cron = require("node-cron");
const authRoute = require("./routes/user");
const bookingRoute = require("./routes/booking");
const bodyParser = require("body-parser");
const uploadRoute = require("./routes/uploadRoute");
const newsRoutes = require("./routes/newsRoute");
const adminRoute = require("./routes/admin");
const trainerRoute = require("./routes/trainers");
const archivedbookings = require("./models/Booking/archivedBookings");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

//for image file
const storageConfig = multer.diskStorage({
  filename: (req, file, cb) => {
    const suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, suffix + "-" + file.originalname);
  },
});

const filterConfig = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, undefined);
  }
};
app.use(
  multer({ storage: storageConfig, fileFilter: filterConfig }).array(
    "profileImage"
  )
);
app.use("/uploads", express.static("uploads"));
//

app.use(authRoute);
app.use(bookingRoute);
app.use(adminRoute);
app.use("/", newsRoutes);
app.use(newsRoutes);
app.use(trainerRoute);
cron.schedule("59 23 * * *", archivedbookings);

const port = 4500;

app.set("port", port);

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(port);
  console.log(`Server is running at port - ${port}`);
});
