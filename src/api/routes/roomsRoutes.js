const express = require('express');
const controller = require('../controllers/roomController');
const authorize = require('../middlewares/authorize');
const validate = require('../middlewares/validate');
const multerUpload = require('../middlewares/multerUpload');
const checkRoomExistence = require('../middlewares/checkRoomExistence');
const { addRoomSchema } = require('../validation').roomsSchemas;

const router = express.Router();

router.post(
  '/:id/upload/',
  authorize('admin'),
  checkRoomExistence,
  multerUpload,
  controller.uploadRoomImage
);

router
  .route('/')
  .post(authorize('admin'), validate(addRoomSchema), controller.addRoom);

router.route('/:id').delete(authorize('admin'), controller.deleteRoom);

module.exports = router;
