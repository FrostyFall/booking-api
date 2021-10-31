const { BookedRoom, HotelReview } = require('../models');
const HotelsRepo = require('../repositories/hotelsRepository');
const RoomsRepo = require('../repositories/roomsRepository');
const BookedRoomsRepo = require('../repositories/bookedRoomsRepository');
const AppError = require('../../config/appError');

exports.addHotel = async (img, title, description) => {
  try {
    await HotelsRepo.createOne({
      img,
      title,
      description,
    });

    return {
      status: 'success',
      message: 'Hotel has been added successfully',
    };
  } catch (err) {
    throw new AppError('Failed to add a hotel', 500);
  }
};

exports.deleteHotel = async (hotelID) => {
  try {
    await HotelsRepo.deleteOne(hotelID);

    return {
      status: 'success',
      message: 'Hotel has been deleted successfully',
    };
  } catch (err) {
    throw new AppError('Failed to delete a hotel', 500);
  }
};

exports.getHotels = async () => {
  try {
    const hotels = await HotelsRepo.findAll();

    return {
      status: 'success',
      data: hotels,
    };
  } catch (err) {
    throw new AppError('Failed to get all hotels', 500);
  }
};

exports.getHotel = async (hotelID) => {
  try {
    const hotel = await HotelsRepo.findById(hotelID);

    return {
      status: 'success',
      data: hotel,
    };
  } catch (err) {
    throw new AppError(
      'Failed to get the hotel details and its free rooms',
      500
    );
  }
};

exports.getHotelFreeRooms = async (hotelID) => {
  try {
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
  } catch (err) {
    throw new AppError(
      'Failed to get the hotel details and its free rooms',
      500
    );
  }
};

exports.addReview = async (hotelID, userID, review, stars) => {
  try {
    await HotelReview.create({
      hotel_id: hotelID,
      user_id: userID,
      review,
      stars,
    });

    return {
      status: 'success',
      message: 'Review has been added successfully',
    };
  } catch (err) {
    throw new AppError('Failed to add a hotel review', 500);
  }
};

exports.getReviews = async (hotelID) => {
  try {
    const reviews = await HotelReview.findAll({
      where: {
        hotel_id: hotelID,
      },
    });

    return {
      status: 'success',
      data: reviews,
    };
  } catch (err) {
    throw new AppError('Failed to get the hotel reviews', 500);
  }
};
