const BookedRoomRepo = require('../repositories/bookedRoomRepository');
const UserServices = require('./userServices');
const RoomServices = require('./roomServices');
const AppError = require('../../utils/appError');
const pagination = require('../../utils/pagination');

exports.getRoomBookings = async (roomID) => {
  return await BookedRoomRepo.findByRoomId(roomID);
};

exports.getUserBookings = async ({ targetUserID, userID, userRole }) => {
  if (!(await UserServices.getUserById(targetUserID)).user) {
    throw new AppError('Specified user not found', 400);
  }

  if (userRole === 'user' && targetUserID !== userID) {
    throw new AppError(
      "You have no permission to get this user's booked rooms",
      403
    );
  }

  const bookings = await BookedRoomRepo.findByUserId(targetUserID);

  return { bookings };
};

exports.getBookings = async ({ page, amount }) => {
  const options = pagination({ page, amount });

  const bookings = await BookedRoomRepo.findAll(options);

  return { bookings };
};

exports.getBookingById = async (id) => {
  const booking = await BookedRoomRepo.findById(id);

  return booking;
};

exports.bookRoom = async ({ roomID, userID, bookedDate, leaveDate }) => {
  if (!(await RoomServices.getRoom(roomID))) {
    throw new AppError('Specified room not found', 400);
  }

  if ((await this.getRoomBookings(roomID)).length > 0) {
    throw new AppError('This room has already been booked', 400);
  }

  return await BookedRoomRepo.createOne({
    roomID,
    userID,
    bookedDate,
    leaveDate,
  });
};

exports.cancelBooking = async ({ bookingID, userID, userRole }) => {
  const booking = await this.getBookingById(bookingID);

  if (!booking) {
    throw new AppError('Specified booking is not found', 400);
  }

  if (userRole === 'user' && booking.user_id !== parseInt(userID, 10)) {
    throw new AppError('You have no permission to delete this booking', 403);
  }

  return await BookedRoomRepo.deleteById(bookingID);
};
