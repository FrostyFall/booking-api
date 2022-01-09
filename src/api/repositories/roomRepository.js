const { unlink } = require('fs/promises');
const { Room, BookedRoom } = require('../models');
const db = require('../../config/DBConnection');
const AppError = require('../../utils/appError');

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
  const { img } = await this.findById(id);
  const t = await db.transaction();
  let result;

  try {
    result = await Room.destroy({
      where: {
        id,
      },
      individualHooks: true,
      transaction: t,
    });

    if (img !== null) {
      await unlink(img);
    }

    await BookedRoom.destroy({
      where: {
        room_id: id,
      },
    });

    await t.commit();
  } catch (error) {
    await t.rollback();
    throw new AppError('Error occured while deleting the room', 500);
  }

  return result;
};
