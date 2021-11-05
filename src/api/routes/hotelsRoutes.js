const express = require('express');
const controller = require('../controllers/hotelsController');
const authorize = require('../middlewares/authorize');

const router = express.Router();

router
  .route('/')
  .get(authorize('admin', 'user'), controller.getHotels)
  .post(authorize('admin'), controller.addHotel);

router
  .route('/:id')
  .get(authorize('admin', 'user'), controller.getHotel)
  .delete(authorize('admin'), controller.deleteHotel);

router.get(
  '/:id/free-rooms',
  authorize('admin', 'user'),
  controller.getHotelFreeRooms
);

router
  .route('/:id/reviews')
  .get(authorize('admin', 'user'), controller.getReviews)
  .post(authorize('admin', 'user'), controller.addReview);

module.exports = router;
