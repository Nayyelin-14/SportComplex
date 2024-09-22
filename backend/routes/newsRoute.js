const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

router.post('/addnew', newsController.addNew);

router.post('/removenew', newsController.removeNew);

router.get('/allnews', newsController.getAllNews);

module.exports = router;
