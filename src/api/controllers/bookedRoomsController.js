const BookedRoomsServices = require('../services/bookedRoomsServices');
const AppError = require('../../utils/appError');
const Response = require('../../utils/response');

exports.bookRoom = async (req, res, next) => {
  try {
    const { roomID, bookedDate, leaveDate } = req.body;
    const userID = parseInt(req.user.id, 10);

    // check if room exists

    if ((await BookedRoomsServices.getRoomBookings(roomID)).length > 0) {
      return next(new AppError('This room has already been booked', 400));
    }

    await BookedRoomsServices.bookRoom(roomID, userID, bookedDate, leaveDate);

    res.status(201).json(new Response('Room has been booked successfully'));
  } catch (err) {
    next(err);
  }
};

exports.cancelBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userID = parseInt(req.user.id, 10);

    const booking = await BookedRoomsServices.getBookingById(id);

    if (!booking) {
      return next(new AppError('Specified booking is not found', 400));
    }

    if (req.user.role === 'user' && booking.user_id !== userID) {
      return next(
        new AppError('You have no permission to delete this booking', 403)
      );
    }

    await BookedRoomsServices.cancelBooking(id);

    res
      .status(201)
      .json(new Response('Booking has been cancelled successfully'));
  } catch (err) {
    next(err);
  }
};

exports.getAllBookings = async (req, res, next) => {
  try {
    const fetchedBookings = await BookedRoomsServices.getBookings();

    res.status(200).json(new Response(null, fetchedBookings));
  } catch (err) {
    next(err);
  }
};
