const BookedRoomsRepo = require('../repositories/bookedRoomsRepository');

exports.bookRoom = async (roomID, userID, bookedDate, leaveDate) => {
  await BookedRoomsRepo.createOne(roomID, userID, bookedDate, leaveDate);

  return {
    status: 'success',
    message: 'Room has been booked successfully',
  };
};

exports.cancelBooking = async (bookingID) => {
  await BookedRoomsRepo.deleteById(bookingID);

  return {
    status: 'success',
    message: 'Booking has been cancelled successfully',
  };
};

exports.getUserBookings = async (userID) => {
  const bookings = await BookedRoomsRepo.findByUserId(userID);

  return {
    status: 'success',
    data: bookings,
  };
};

exports.getBookings = async () => {
  const bookings = await BookedRoomsRepo.findAll();

  return {
    status: 'success',
    data: bookings,
  };
};
