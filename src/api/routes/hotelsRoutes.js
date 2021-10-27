const express = require('express');
const controller = require('../controllers/hotelsController');

const router = express.Router();

router.route('/').post(controller.addHotel);

module.exports = router;
