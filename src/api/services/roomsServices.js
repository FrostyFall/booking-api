const RoomsRepo = require('../repositories/roomsRepository');

exports.addRoom = async (hotelID, img, type, cost) => {
  await RoomsRepo.createOne(hotelID, img, type, cost);

  return {
    status: 'success',
    message: 'Room has been added successfully',
  };
};
