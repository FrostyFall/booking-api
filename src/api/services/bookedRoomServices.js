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

exports.bookRoom = async ({ roomID, userID, moveInDate, leaveDate }) => {
  if (!(await RoomServices.getRoom(roomID))) {
    throw new AppError('Specified room not found', 400);
  }

  if ((await BookedRoomRepo.findActiveOrCancelledRooms(roomID)).length !== 0) {
    throw new AppError('This room has already been booked', 400);
  }

  if (new Date(moveInDate).getTime() - new Date().getTime() < 0) {
    throw new AppError('Invalid move in date', 400);
  }

  return await BookedRoomRepo.createOne({
    roomID,
    userID,
    moveInDate,
    leaveDate,
  });
};

exports.cancelBooking = async ({ bookingID, userID, userRole }) => {
  const booking = await this.getBookingById(bookingID);

  if (!booking || booking.is_cancelled) {
    throw new AppError("Specified booking doesn't exist or is not active", 400);
  }

  if (userRole === 'user' && booking.user_id !== parseInt(userID, 10)) {
    throw new AppError('You have no permission to delete this booking', 403);
  }

  const datesDifferenceInMs =
    new Date(booking.move_in_date).getTime() - new Date().getTime();
  const daysBeforeMovingIn = parseInt(
    Math.floor(datesDifferenceInMs / (1000 * 60 * 60 * 24)),
    10
  );

  if (daysBeforeMovingIn < 5) {
    throw new AppError(
      "You cannot cancel this booking. It's less than 5 days until moving in",
      400
    );
  }

  return await BookedRoomRepo.cancelById(bookingID);
};
