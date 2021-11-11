const HotelsRepo = require('../repositories/hotelsRepository');
const RoomsRepo = require('../repositories/roomsRepository');
const BookedRoomsRepo = require('../repositories/bookedRoomsRepository');
const HotelReviewsRepo = require('../repositories/hotelReviewsRepository');

exports.addHotel = async (img, title, description) => {
  return await HotelsRepo.createOne(img, title, description);
};

exports.deleteHotel = async (hotelID) => {
  return await HotelsRepo.deleteById(hotelID);
};

exports.getHotels = async () => {
  const hotels = await HotelsRepo.findAll();

  return { hotels };
};

exports.getHotel = async (hotelID) => {
  const hotel = await HotelsRepo.findById(hotelID);

  return { hotel };
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

  return { freeRooms };
};

exports.addReview = async (hotelID, userID, review, stars) => {
  return await HotelReviewsRepo.createOne(hotelID, userID, review, stars);
};

exports.getReviews = async (hotelID) => {
  const reviews = await HotelReviewsRepo.findByHotelId(hotelID);

  return { reviews };
};
