const RoomsRepo = require('../repositories/roomsRepository');
const AppError = require('../../config/appError');

exports.addRoom = async (hotelID, img, type, cost) => {
  try {
    await RoomsRepo.createOne(hotelID, img, type, cost);

    return {
      status: 'success',
      message: 'Room has been added successfully',
    };
  } catch (err) {
    throw new AppError('Failed to add a room', 500);
  }
};
