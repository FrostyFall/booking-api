const express = require('express');
const controller = require('../controllers/analyticsController');
const authorize = require('../middlewares/authorize');

const router = express.Router();

router
  .route('/most-booked-hotel')
  .get(authorize('admin'), controller.getMostBookedHotel);

module.exports = router;
