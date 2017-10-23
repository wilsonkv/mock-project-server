const express = require('express');
const router = express.Router();

const locationsController = require('../controllers/locationsController');

router.get('/', locationsController.index);

module.exports = router;
