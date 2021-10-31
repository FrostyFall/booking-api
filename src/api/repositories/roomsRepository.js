const { Room } = require('../models');

exports.findByHotelId = async (hotelID) => {
  const result = await Room.findAll({
    where: {
      hotel_id: hotelID,
    },
  });

  return result;
};

exports.findById = async (id) => {
  const result = await Room.findAll({
    where: {
      id,
    },
  });

  return result;
};
