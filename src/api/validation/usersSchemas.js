const Joi = require('joi');

const { object, string } = Joi.types();

exports.updatePassword = object.keys({
  currentPassword: string.min(8).max(32).required(),
  newPassword: string.min(8).max(32).required(),
});

exports.updateUserPassword = object.keys({
  newPassword: string.min(8).max(32).required(),
});
