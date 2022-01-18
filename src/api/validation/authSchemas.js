const Joi = require('joi');

const { object, string } = Joi.types();

exports.signupSchema = object.keys({
  email: string.email().required(),
  password: string.min(8).max(32).required(),
  passwordConfirm: string.min(8).max(32).required(),
  firstName: string.max(20).required(),
  lastName: string.max(30).required(),
  role: string.required(),
});

exports.loginSchema = object.keys({
  email: string.email().required(),
  password: string.min(8).max(32).required(),
});

exports.tokenSchema = object.keys({
  email: string.email().required(),
  refreshToken: string.min(12).required(),
});
