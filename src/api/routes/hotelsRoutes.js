const express = require('express');
const controller = require('../controllers/hotelsController');
const authorize = require('../middlewares/authorize');

const router = express.Router();

router
  .route('/')
  .get(authorize('user'), controller.getHotels)
  .post(controller.addHotel);

router
  .route('/:id')
  .get(authorize('user'), controller.getHotel)
  .delete(controller.deleteHotel);

router.get('/:id/free-rooms', authorize('user'), controller.getHotelFreeRooms);

router
  .route('/:id/reviews')
  .get(authorize('user'), controller.getReviews)
  .post(authorize('user'), controller.addReview);

module.exports = router;
