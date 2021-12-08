const RoomRepo = require('../repositories/roomRepository');
const HotelServices = require('./hotelServices');
const AppError = require('../../utils/appError');

exports.addRoom = async ({ hotelID, img, type, cost }) => {
  if (!(await HotelServices.getHotel(hotelID)).hotel) {
    throw new AppError('Specified hotel not found', 400);
  }

  return await RoomRepo.createOne({
    hotelID,
    img,
    type,
    cost,
  });
};

exports.getRoom = async (roomID) => {
  return await RoomRepo.findById(roomID);
};
