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
const archivedbookings = require("./models/Booking/archivedBookings");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(authRoute);
app.use(bookingRoute);
app.use(adminRoute);
app.use("/", newsRoutes);
app.use(newsRoutes);

cron.schedule("59 23 * * *", archivedbookings);

const port = 4500;

app.set("port", port);
mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(port);
  console.log(`Server is running at port - ${port}`);
});
