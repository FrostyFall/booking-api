const { Room } = require('../models');

exports.findByHotelId = async (hotelID) => {
  const result = await Room.findAll({
    where: {
      hotel_id: hotelID,
    },
  });

  return result;
};

exports.findByIds = async ({ freeRoomsIDs, limit, offset }) => {
  const result = await Room.findAll({
    where: {
      id: freeRoomsIDs,
    },
    limit,
    offset,
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

exports.deleteById = async (id) => {
  const result = await Room.destroy({
    where: {
      id,
    },
    individualHooks: true,
  });

  return result;
};
