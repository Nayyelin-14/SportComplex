const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/auth");
const adminController = require("../controllers/admin");
const adminMiddlware = require("../Middleware/isadmin");
const upload = require("../utils/storageConfig");
const path = require("path");

router.get(
  "/admin/allusers",
  authMiddleware,
  authMiddleware,
  adminController.getAllUsers
);

router.get(
  "/admin/allbookings",
  authMiddleware,
  adminMiddlware,
  adminController.getallBookings
);

router.post(
  "/admin/restrict-user/:userID",
  authMiddleware,
  adminMiddlware,
  adminController.restrictUser
);

router.post(
  "/admin/unrestrict-user/:userID",
  authMiddleware,
  adminMiddlware,
  adminController.UnrestrictUser
);

router.delete(
  "/admin/delete-user/:userID",
  authMiddleware,
  adminMiddlware,
  adminController.deleteUser
);

const { body } = require('express-validator');

router.post(
  "/admin/addnew",
  authMiddleware,
  adminMiddlware,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('featuredline').notEmpty().withMessage('featuredline is required'),
    body('detail').notEmpty().withMessage('Detail is required'),
  ],
  adminController.addNew
);


router.post(
  "/admin/removenew/:newsid",
  authMiddleware,
  adminMiddlware,
  adminController.removeNew
)

router.get(
  "/admin/allnews",
  authMiddleware,
  adminMiddlware,
  adminController.getAllNews
)

router.use(
  "/images",
  express.static(path.join(__dirname, "../upload/images"))
);

router.post("/admin/upload", upload.single("news"), (req, res) => {
  console.log(`File uploaded to: ${req.file.path}`);
  return res.json({
    success: 1,
    image_url: `http://localhost:${req.app.get("port")}/images/${
      req.file.filename
    }`,
    // filename: req.file.filename,
  });
});

module.exports = router;
