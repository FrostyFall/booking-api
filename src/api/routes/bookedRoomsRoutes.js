const express = require('express');
const controller = require('../controllers/bookedRoomsController');

const router = express.Router();

router.route('/').post(controller.bookRoom);

module.exports = router;
