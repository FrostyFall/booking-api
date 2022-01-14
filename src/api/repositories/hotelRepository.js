const { unlink } = require('fs/promises');
const { Hotel } = require('../models');
const RoomRepo = require('./roomRepository');
const db = require('../../config/DBConnection');
const AppError = require('../../utils/appError');

exports.updateImgById = async ({ id, path }) => {
  const result = await Hotel.update({ img: './' + path }, { where: { id } });

  return result;
};

exports.createOne = async ({ title, description, img = null }) => {
  const result = await Hotel.create({
    img,
    title,
    description,
  });

  return result;
};

exports.deleteById = async (id) => {
  const { img } = await this.findById(id);
  const t = await db.transaction();
  let result;

  try {
    result = await Hotel.destroy({
      where: {
        id,
      },
      individualHooks: true,
      transaction: t,
    });

    if (img !== null) {
      await unlink(img);
    }

    const hotelRooms = await RoomRepo.findByHotelId(id);
    const hotelRoomsIDs = hotelRooms.map((room) => room.id);
    hotelRoomsIDs.forEach(async (roomID) => {
      await RoomRepo.deleteById(roomID);
    });

    await t.commit();
  } catch (error) {
    await t.rollback();
    throw new AppError('Error occured while deleting the hotel', 500);
  }

  return result;
};

exports.findAll = async ({ limit, offset }) => {
  // FIXME: Insert all fields in query methods
  const result = await Hotel.findAll({ limit, offset });

  return result;
};

exports.findById = async (id) => {
  const result = await Hotel.findOne({
    where: {
      id,
    },
  });

  return result;
};
