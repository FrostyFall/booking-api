const Joi = require('joi');

const { object, number, date } = Joi.types();

exports.bookRoomSchema = object.keys({
  roomID: number.integer().min(1).required(),
  bookedDate: date.iso().required(),
  leaveDate: date.iso().greater(Joi.ref('bookedDate')).required(),
});
