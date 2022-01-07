const { Room } = require('../models');

exports.findByHotelId = async (hotelID) => {
  const result = await Room.findAll({
    where: {
      hotel_id: hotelID,
    },
  });

  return result;
};

exports.findByIds = async (ids) => {
  const result = await Room.findAll({
    where: {
      id: ids,
    },
  });

  return result;
};

exports.findById = async (id) => {
  const result = await Room.findOne({
    where: {
      id,
    },
  });

  return result;
};

exports.createOne = async ({ hotelID, img = null, type, cost }) => {
  const result = await Room.create({ hotel_id: hotelID, img, type, cost });

  return result;
};
