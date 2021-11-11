const BookedRoomsRepo = require('../repositories/bookedRoomsRepository');

exports.getRoomBookings = async (roomID) => {
  return await BookedRoomsRepo.findByRoomId(roomID);
};

exports.bookRoom = async (roomID, userID, bookedDate, leaveDate) => {
  return await BookedRoomsRepo.createOne(roomID, userID, bookedDate, leaveDate);
};

exports.cancelBooking = async (bookingID) => {
  return await BookedRoomsRepo.deleteById(bookingID);
};

exports.getUserBookings = async (userID) => {
  const bookings = await BookedRoomsRepo.findByUserId(userID);

  return { bookings };
};

exports.getBookings = async () => {
  const bookings = await BookedRoomsRepo.findAll();

  return { bookings };
};

exports.getBookingById = async (id) => {
  const booking = await BookedRoomsRepo.findById(id);

  return booking;
};
