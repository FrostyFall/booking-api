const express = require('express');
const controller = require('../controllers/userController');
const authorize = require('../middlewares/authorize');

const router = express.Router();

router.route('/').get(authorize('admin'), controller.getUsers);

router.route('/:id').delete(authorize('admin', 'user'), controller.deleteSelf);

router
  .route('/:id/booked-rooms')
  .get(authorize('admin', 'user'), controller.getUserBookings);

module.exports = router;
