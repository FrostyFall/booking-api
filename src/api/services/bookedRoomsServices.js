const BookedRoomsRepo = require('../repositories/bookedRoomsRepository');
const AppError = require('../../utils/appError');

exports.bookRoom = async (roomID, userID, bookedDate, leaveDate) => {
  try {
    await BookedRoomsRepo.createOne(roomID, userID, bookedDate, leaveDate);

    return {
      status: 'success',
      message: 'Room has been booked successfully',
    };
  } catch (err) {
    throw new AppError('Failed to book a room', 500);
  }
};

exports.cancelBooking = async (bookingID) => {
  try {
    await BookedRoomsRepo.deleteById(bookingID);

    return {
      status: 'success',
      message: 'Booking has been cancelled successfully',
    };
  } catch (err) {
    throw new AppError('Failed to book a room', 500);
  }
};

exports.getUserBookings = async (userID) => {
  try {
    const bookings = await BookedRoomsRepo.findByUserId(userID);

    return {
      status: 'success',
      data: bookings,
    };
  } catch (err) {
    throw new AppError('Failed to book a room', 500);
  }
};

exports.getBookings = async () => {
  try {
    const bookings = await BookedRoomsRepo.findAll();

    return {
      status: 'success',
      data: bookings,
    };
  } catch (err) {
    throw new AppError('Failed to book a room', 500);
  }
};
