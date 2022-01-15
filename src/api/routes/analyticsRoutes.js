const express = require('express');
const controller = require('../controllers/analyticsController');

const router = express.Router();

router.route('/most-booked-hotel').get(controller.getMostBookedHotel);

module.exports = router;
