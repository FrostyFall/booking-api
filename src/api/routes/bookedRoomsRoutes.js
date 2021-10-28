const express = require('express');
const controller = require('../controllers/bookedRoomsController');

const router = express.Router();

router.route('/').get(controller.getUserBookings).post(controller.bookRoom);

router.route('/:id').delete(controller.cancelBooking);

module.exports = router;
