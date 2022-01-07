const BookedRoomServices = require('../services/bookedRoomServices');
const Response = require('../../utils/response');

exports.bookRoom = async (req, res, next) => {
  try {
    const { roomID, bookedDate, leaveDate } = req.body;
    const userID = parseInt(req.user.id, 10);

    await BookedRoomServices.bookRoom({
      roomID,
      userID,
      bookedDate,
      leaveDate,
    });

    res.status(201).json(new Response('Room has been booked successfully'));
  } catch (err) {
    next(err);
  }
};

exports.cancelBooking = async (req, res, next) => {
  try {
    const { id: bookingID } = req.params;
    const { id: userID, role: userRole } = req.user;

    await BookedRoomServices.cancelBooking({ bookingID, userID, userRole });

    res
      .status(201)
      .json(new Response('Booking has been cancelled successfully'));
  } catch (err) {
    next(err);
  }
};

exports.getAllBookings = async (req, res, next) => {
  try {
    const { page, amount } = req.query;
    const fetchedBookings = await BookedRoomServices.getBookings({
      page,
      amount,
    });

    res.status(200).json(new Response(null, fetchedBookings));
  } catch (err) {
    next(err);
  }
};
