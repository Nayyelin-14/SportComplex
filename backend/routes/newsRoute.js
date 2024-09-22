const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");
const authMiddleware = require("../Middleware/auth");
router.post("/addnew", authMiddleware, newsController.addNew);

router.post("/removenew", authMiddleware, newsController.removeNew);

router.get("/allnews", authMiddleware, newsController.getAllNews);

module.exports = router;
