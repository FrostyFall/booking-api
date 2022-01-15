const BookedRoomServices = require('../services/bookedRoomServices');
const Response = require('../../utils/response');
const catchAsync = require('../../utils/catchAsync');

exports.bookRoom = catchAsync(async (req, res) => {
  const { roomID, bookedDate, leaveDate } = req.body;
  const userID = parseInt(req.user.id, 10);

  await BookedRoomServices.bookRoom({
    roomID,
    userID,
    bookedDate,
    leaveDate,
  });

  res.status(201).json(new Response('Room has been booked successfully'));
});

exports.cancelBooking = catchAsync(async (req, res) => {
  const { id: bookingID } = req.params;
  const { id: userID, role: userRole } = req.user;

  await BookedRoomServices.cancelBooking({ bookingID, userID, userRole });

  res.status(201).json(new Response('Booking has been cancelled successfully'));
});

exports.getAllBookings = catchAsync(async (req, res) => {
  const { page, amount } = req.query;
  const fetchedBookings = await BookedRoomServices.getBookings({
    page,
    amount,
  });

  res.status(200).json(new Response(null, fetchedBookings));
});
