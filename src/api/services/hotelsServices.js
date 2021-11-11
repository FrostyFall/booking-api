const HotelsRepo = require('../repositories/hotelsRepository');
const RoomsRepo = require('../repositories/roomsRepository');
const BookedRoomsRepo = require('../repositories/bookedRoomsRepository');
const HotelReviewsRepo = require('../repositories/hotelReviewsRepository');

exports.addHotel = async (img, title, description) => {
  await HotelsRepo.createOne(img, title, description);

  return {
    status: 'success',
    message: 'Hotel has been added successfully',
  };
};

exports.deleteHotel = async (hotelID) => {
  await HotelsRepo.deleteById(hotelID);

  return {
    status: 'success',
    message: 'Hotel has been deleted successfully',
  };
};

exports.getHotels = async () => {
  const hotels = await HotelsRepo.findAll();

  return {
    status: 'success',
    data: hotels,
  };
};

exports.getHotel = async (hotelID) => {
  const hotel = await HotelsRepo.findById(hotelID);

  return {
    status: 'success',
    data: hotel,
  };
};

exports.getHotelFreeRooms = async (hotelID) => {
  const hotelRooms = await RoomsRepo.findByHotelId(hotelID);
  const hotelRoomsIDs = hotelRooms.map((room) => room.id);
  const hotelBookedRooms = await BookedRoomsRepo.findByRoomId(hotelRoomsIDs);
  const hotelBookedRoomsIDs = hotelBookedRooms.map((room) => room.room_id);
  const freeRoomsIDs = hotelRoomsIDs.filter(
    (roomID) => !hotelBookedRoomsIDs.includes(roomID)
  );
  const freeRooms = await RoomsRepo.findById(freeRoomsIDs);

  return {
    status: 'success',
    data: freeRooms,
  };
};

exports.addReview = async (hotelID, userID, review, stars) => {
  await HotelReviewsRepo.createOne(hotelID, userID, review, stars);

  return {
    status: 'success',
    message: 'Review has been added successfully',
  };
};

exports.getReviews = async (hotelID) => {
  const reviews = await HotelReviewsRepo.findByHotelId(hotelID);

  return {
    status: 'success',
    data: reviews,
  };
};
