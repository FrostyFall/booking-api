const express = require('express');
const controller = require('../controllers/hotelsController');

const router = express.Router();

router.route('/').get(controller.getHotels).post(controller.addHotel);

router.route('/:id').get(controller.getHotel).delete(controller.deleteHotel);

router.get('/:id/free-rooms', controller.getHotelFreeRooms);

router.route('/:id/reviews').post(controller.addReview);

module.exports = router;
