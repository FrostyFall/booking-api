const RoomRepo = require('../repositories/roomRepository');
const HotelServices = require('./hotelServices');
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

exports.deleteRoom = async (roomID) => {
  if (!(await this.getRoom(roomID))) {
    throw new AppError('Specified room not found', 400);
  }

  return await RoomRepo.deleteById(roomID);
};
