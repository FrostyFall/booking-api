const express = require('express');
const controller = require('../controllers/roomsController');

const router = express.Router();

router.route('/').post(controller.addRoom);

module.exports = router;
