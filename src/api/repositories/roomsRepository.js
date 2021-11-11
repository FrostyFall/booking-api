const { Room } = require('../models');

exports.findByHotelId = async (hotelID) => {
  const result = await Room.findAll({
    where: {
      hotel_id: hotelID,
    },
  });

  return result;
};

exports.findOneById = async (id) => {
  const result = await Room.findAll({
    where: {
      id,
    },
  });

  return result[0];
};

exports.findById = async (id) => {
  const result = await Room.findAll({
    where: {
      id,
    },
  });

  return result;
};

exports.createOne = async (hotelID, img, type, cost) => {
  const result = await Room.create({ hotel_id: hotelID, img, type, cost });

  return result;
};
