const express = require('express');
const controller = require('../controllers/userController');
const authorize = require('../middlewares/authorize');
const validate = require('../middlewares/validate');
const { updatePassword, updateUserPassword } =
  require('../validation').usersSchemas;

const router = express.Router();

router.route('/').get(authorize('admin'), controller.getUsers);

router
  .route('/update-password')
  .patch(
    authorize('admin', 'user'),
    validate(updatePassword),
    controller.updatePassword
  );

router
  .route('/:id/update-password')
  .patch(
    authorize('admin'),
    validate(updateUserPassword),
    controller.updateUserPassword
  );

router.route('/:id').delete(authorize('admin', 'user'), controller.deleteSelf);

router
  .route('/:id/booked-rooms')
  .get(authorize('admin', 'user'), controller.getUserBookings);

module.exports = router;
