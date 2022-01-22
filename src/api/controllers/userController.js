const UserServices = require('../services/userServices');
const BookedRoomServices = require('../services/bookedRoomServices');
const Response = require('../../utils/response');
const catchAsync = require('../../utils/catchAsync');

exports.getUsers = catchAsync(async (req, res) => {
  const { page, amount, first_name, last_name } = req.query;
  const fetchedUsers = await UserServices.getUsers(
    { first_name, last_name },
    { page, amount }
  );

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

exports.updatePassword = catchAsync(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  await UserServices.updatePassword({
    user: req.user,
    currentPassword,
    newPassword,
  });

  res.status(200).json(new Response('Your password has been updated'));
});

exports.updateUserPassword = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;

  await UserServices.updateUserPassword({ userId: id, newPassword });

  res.status(200).json(new Response("User's password has been updated"));
});

exports.updateInfo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { newFirstName, newLastName } = req.body;

  await UserServices.updateInfo({
    user: req.user,
    requestedUserId: id,
    data: { first_name: newFirstName, last_name: newLastName },
  });

  res.status(200).json(new Response('Provided data has been updated'));
});
