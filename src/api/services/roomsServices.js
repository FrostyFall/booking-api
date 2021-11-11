const RoomsRepo = require('../repositories/roomsRepository');

exports.addRoom = async (hotelID, img, type, cost) => {
  return await RoomsRepo.createOne(hotelID, img, type, cost);
};

exports.getRoom = async (roomID) => {
  return await RoomsRepo.findOneById(roomID);
};
