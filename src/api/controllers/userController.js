const UserServices = require('../services/userServices');
const BookedRoomServices = require('../services/bookedRoomServices');
const Response = require('../../utils/response');
const catchAsync = require('../../utils/catchAsync');

exports.getUsers = catchAsync(async (req, res) => {
  const { page, amount } = req.query;
  const fetchedUsers = await UserServices.getUsers({ page, amount });

  res.status(200).json(new Response(null, fetchedUsers));
});

exports.deleteSelf = catchAsync(async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const authUserId = req.user.id;

  await UserServices.deleteSelf({ userId, authUserId });

  res.status(200).json(new Response('Your account has been deleted'));
});

exports.getUserBookings = catchAsync(async (req, res) => {
  const targetUserID = parseInt(req.params.id, 10);
  const { id: userID, role: userRole } = req.user;

  const fetchedUserBookings = await BookedRoomServices.getUserBookings({
    targetUserID,
    userID,
    userRole,
  });

  res.status(200).json(new Response(null, fetchedUserBookings));
});
