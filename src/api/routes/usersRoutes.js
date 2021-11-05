const express = require('express');
const controller = require('../controllers/usersController');
const authorize = require('../middlewares/authorize');

const router = express.Router();

router.route('/').get(controller.getUsers);

router.route('/:id').delete(authorize('user'), controller.deleteSelf);

router
  .route('/:id/booked-rooms')
  .get(authorize('user'), controller.getUserBookings);

module.exports = router;
