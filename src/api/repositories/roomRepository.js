const { Room } = require('../models');

exports.findByHotelId = async (hotelID) => {
  const result = await Room.findAll({
    where: {
      hotel_id: hotelID,
    },
    attributes: [
      'id',
      'img',
      'rating',
      'cost',
      'created_at',
      'deleted_at',
      'hotel_id',
    ],
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
    attributes: [
      'id',
      'img',
      'rating',
      'cost',
      'created_at',
      'deleted_at',
      'hotel_id',
    ],
  });

  return result;
};

exports.findById = async (id) => {
  const result = await Room.findOne({
    where: {
      id,
    },
    attributes: [
      'id',
      'img',
      'rating',
      'cost',
      'created_at',
      'deleted_at',
      'hotel_id',
    ],
  });

  return result;
};

exports.createOne = async ({ hotelID, img = null, rating, cost }) => {
  const result = await Room.create({ hotel_id: hotelID, img, rating, cost });

  return result;
};

exports.transactionDelete = async ({ id, t }) => {
  const result = await Room.destroy({
    where: {
      id,
    },
    transaction: t,
  });

  return result;
};
