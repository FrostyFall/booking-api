const { Room, BookedRoom, HotelReview } = require('../models');
const repository = require('../repositories/hotelsRepository');
const AppError = require('../../config/appError');

exports.addHotel = async (img, title, description) => {
  try {
    await repository.createOne({
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
    await repository.deleteOne(hotelID);

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
    const hotels = await repository.findAll();

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
    const hotel = await repository.findById(hotelID);

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
    const hotelRooms = await Room.findAll({
      where: {
        hotel_id: hotelID,
      },
    });
    const hotelRoomsIDs = hotelRooms.map((room) => room.id);
    const hotelBookedRooms = await BookedRoom.findAll({
      where: {
        room_id: hotelRoomsIDs,
      },
    });
    const hotelBookedRoomsIDs = hotelBookedRooms.map((room) => room.room_id);
    const freeRoomsIDs = hotelRoomsIDs.filter(
      (roomID) => !hotelBookedRoomsIDs.includes(roomID)
    );
    const freeRooms = await Room.findAll({
      where: {
        id: freeRoomsIDs,
      },
    });

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
