const express = require('express');
const controller = require('../controllers/roomsController');
const authorize = require('../middlewares/authorize');

const router = express.Router();

router.route('/').post(authorize('admin'), controller.addRoom);

module.exports = router;
