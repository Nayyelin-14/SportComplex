const express = require("express");
const router = express.Router();
const upload = require("../utils/storageConfig");
const path = require("path");

router.use(
  "/images",

  express.static(path.join(__dirname, "../upload/images"))
);

router.post("/upload", authMiddleware, upload.single("news"), (req, res) => {
  console.log(`File uploaded to: ${req.file.path}`);
  res.json({
    success: 1,
    image_url: `http://localhost:${req.app.get("port")}/images/${
      req.file.filename
    }`,
    // filename: req.file.filename,
  });
});

module.exports = router;
