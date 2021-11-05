const express = require('express');
const controller = require('../controllers/bookedRoomsController');
const authorize = require('../middlewares/authorize');

const router = express.Router();

router
  .route('/')
  .get(controller.getBookings)
  .post(authorize('user'), controller.bookRoom);

router.route('/:id').delete(authorize('user'), controller.cancelBooking);

module.exports = router;
