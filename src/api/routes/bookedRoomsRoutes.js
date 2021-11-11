const express = require('express');
const controller = require('../controllers/bookedRoomsController');
const authorize = require('../middlewares/authorize');
const validate = require('../middlewares/validate');
const { bookRoomSchema } = require('../validation').bookedRoomsSchemas;

const router = express.Router();

router
  .route('/')
  .get(authorize('admin'), controller.getAllBookings)
  .post(
    authorize('admin', 'user'),
    validate(bookRoomSchema),
    controller.bookRoom
  );

router
  .route('/:id')
  .delete(authorize('admin', 'user'), controller.cancelBooking);

module.exports = router;
