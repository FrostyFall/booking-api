const express = require('express');
const controller = require('../controllers/authController');
const authorize = require('../middlewares/authorize');
const validate = require('../middlewares/validate');
const passportAuth = require('../middlewares/passportAuth');
const { signupSchema, loginSchema, tokenSchema, disableTokenSchema } =
  require('../validation').authSchemas;

const router = express.Router();

router.route('/signup').post(validate(signupSchema), controller.signup);

router.route('/login').post(validate(loginSchema), controller.login);

router.route('/token').post(validate(tokenSchema), controller.token);

router
  .route('/token/disable')
  .post(
    passportAuth,
    authorize('admin'),
    validate(disableTokenSchema),
    controller.disableToken
  );

module.exports = router;
