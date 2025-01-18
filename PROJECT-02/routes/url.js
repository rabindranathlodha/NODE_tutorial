const express = require('express');
const router = express.Router();
const { handleGenerateNewShortUrl } = require('../controllers/url');

//const urlController = require('../controllers/url');

router.post('/', handleGenerateNewShortUrl);

module.exports = router;