const UserServices = require('../services/userServices');
const BookedRoomServices = require('../services/bookedRoomServices');
const AppError = require('../../utils/appError');
const Response = require('../../utils/response');

exports.getUsers = async (req, res, next) => {
  try {
    const fetchedUsers = await UserServices.getUsers();

    res.status(200).json(new Response(null, fetchedUsers));
  } catch (err) {
    next(err);
  }
};

exports.deleteSelf = async (req, res, next) => {
  try {
    const userID = parseInt(req.params.id, 10);
    const authUserID = req.user.id;

    if (userID !== authUserID) {
      return next(
        new AppError('You have no permission to delete this user', 403)
      );
    }

    await UserServices.deleteUser(userID);

    res.status(200).json(new Response('User has been deleted'));
  } catch (err) {
    next(err);
  }
};

exports.getUserBookings = async (req, res, next) => {
  try {
    const targetUserID = parseInt(req.params.id, 10);
    const { id: userID, role: userRole } = req.user;

    const fetchedUserBookings = await BookedRoomServices.getUserBookings({
      targetUserID,
      userID,
      userRole,
    });

    res.status(200).json(new Response(null, fetchedUserBookings));
  } catch (err) {
    next(err);
  }
};
