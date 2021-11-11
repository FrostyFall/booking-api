const express = require('express');
const controller = require('../controllers/roomsController');
const authorize = require('../middlewares/authorize');
const validate = require('../middlewares/validate');
const { addRoomSchema } = require('../validation').roomsSchemas;

const router = express.Router();

router
  .route('/')
  .post(authorize('admin'), validate(addRoomSchema), controller.addRoom);

module.exports = router;
