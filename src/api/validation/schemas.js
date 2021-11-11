const Joi = require('joi');

const { object, string, number, date } = Joi.types();

// Auth Schemas
exports.signupSchema = object.keys({
  email: string.email().required(),
  password: string.min(8).max(32).required(),
  passwordConfirm: string.min(8).max(32).required(),
  firstName: string.max(20).required(),
  lastName: string.max(30).required(),
  roleID: number.integer().min(1),
});

exports.loginSchema = object.keys({
  email: string.email().required(),
  password: string.min(8).max(32).required(),
});

// Booked Rooms Schemas
exports.bookRoomSchema = object.keys({
  roomID: number.integer().min(1).required(),
  bookedDate: date.iso().required(),
  leaveDate: date.iso().greater(Joi.ref('bookedDate')).required(),
});
