const express = require('express');
const controller = require('../controllers/hotelController');
const authorize = require('../middlewares/authorize');
const validate = require('../middlewares/validate');
const multerUpload = require('../middlewares/multerUpload');
const { addHotelSchema, addReviewSchema } =
  require('../validation').hotelsSchemas;

const router = express.Router();

router.post(
  '/:id/upload/',
  authorize('admin'),
  multerUpload,
  controller.uploadHotelImage
);

router
  .route('/')
  .get(authorize('admin', 'user'), controller.getHotels)
  .post(authorize('admin'), validate(addHotelSchema), controller.addHotel);

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
  .post(
    authorize('admin', 'user'),
    validate(addReviewSchema),
    controller.addReview
  );

module.exports = router;
