const { unlink } = require('fs/promises');
const RoomRepo = require('../repositories/roomRepository');
const BookedRoomRepo = require('../repositories/bookedRoomRepository');
const HotelServices = require('./hotelServices');
const db = require('../../config/DBConnection');
const AppError = require('../../utils/appError');

exports.uploadRoomImage = async ({ id, files }) => {
  if (files.length === 0) {
    throw new AppError('Not a single file has been uploaded', 400);
  }

  const { path } = files[0];

  const room = await RoomRepo.findById(id);

  await room.update({ img: './' + path });

  return { room };
};

exports.addRoom = async ({ hotelID, rating, cost }) => {
  if (!(await HotelServices.getHotel(hotelID))) {
    throw new AppError('Specified hotel not found', 400);
  }

  return await RoomRepo.createOne({
    hotelID,
    rating,
    cost,
  });
};

exports.getRoom = async (roomID) => {
  return await RoomRepo.findById(roomID);
};

exports.deleteRoom = async (id) => {
  if (!(await this.getRoom(id))) {
    throw new AppError('Specified room not found', 400);
  }

  const { img } = await RoomRepo.findById(id);
  const t = await db.transaction();
  let result;

  try {
    result = await RoomRepo.transactionDelete({ id, t });

    if (img !== null) {
      await unlink(img);
    }

    await BookedRoomRepo.transactionDelete({ roomId: id, t });

    await t.commit();
  } catch (error) {
    await t.rollback();
    throw new AppError('Error occured while deleting the room', 500);
  }

  return result;
};
