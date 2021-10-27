const express = require('express');
const controller = require('../controllers/hotelsController');

const router = express.Router();

router.route('/').post(controller.addHotel);

router.route('/:id').delete(controller.deleteHotel);

module.exports = router;
