const HotelRepo = require('../repositories/hotelRepository');
const RoomRepo = require('../repositories/roomRepository');
const BookedRoomRepo = require('../repositories/bookedRoomRepository');
const HotelReviewRepo = require('../repositories/hotelReviewRepository');
const AppError = require('../../utils/appError');

exports.uploadHotelImage = async ({ id, files }) => {
  if (files.length === 0) {
    throw new AppError('Not a single file has been uploaded', 400);
  }

  const { path } = files[0];

  const hotel = await HotelRepo.findById(id);

  if (!hotel) {
    throw new AppError('Specified hotel not found', 404);
  }

  await hotel.update({ img: './' + path });

  return { hotel };
};

exports.addHotel = async ({ title, description }) => {
  return await HotelRepo.createOne({ title, description });
};

exports.deleteHotel = async (hotelID) => {
  if (!(await this.getHotel(hotelID)).hotel) {
    throw new AppError('Specified hotel not found', 400);
  }

  return await HotelRepo.deleteById(hotelID);
};

exports.getHotels = async () => {
  const hotels = await HotelRepo.findAll();

  return { hotels };
};

exports.getHotel = async (hotelID) => {
  const hotel = await HotelRepo.findById(hotelID);

  if (!hotel) {
    throw new AppError('Specified hotel not found', 400);
  }

  return { hotel };
};

exports.getHotelFreeRooms = async (hotelID) => {
  if (!(await this.getHotel(hotelID)).hotel) {
    throw new AppError('Specified hotel not found', 400);
  }

  const hotelRooms = await RoomRepo.findByHotelId(hotelID);
  const hotelRoomsIDs = hotelRooms.map((room) => room.id);
  const hotelBookedRooms = await BookedRoomRepo.findByRoomId(hotelRoomsIDs);
  const hotelBookedRoomsIDs = hotelBookedRooms.map((room) => room.room_id);
  const freeRoomsIDs = hotelRoomsIDs.filter(
    (roomID) => !hotelBookedRoomsIDs.includes(roomID)
  );
  const freeRooms = await RoomRepo.findById(freeRoomsIDs);

  return { freeRooms };
};

exports.addReview = async ({ hotelID, userID, review, stars }) => {
  if (!(await this.getHotel(hotelID)).hotel) {
    throw new AppError('Specified hotel not found', 400);
  }

  return await HotelReviewRepo.createOne({ hotelID, userID, review, stars });
};

exports.getReviews = async (hotelID) => {
  if (!(await this.getHotel(hotelID)).hotel) {
    throw new AppError('Specified hotel not found', 400);
  }

  const reviews = await HotelReviewRepo.findByHotelId(hotelID);

  return { reviews };
};
