const UsersServices = require('../services/usersServices');
const BookedRoomsServices = require('../services/bookedRoomsServices');
const AppError = require('../../utils/appError');
const Response = require('../../utils/response');

exports.getUsers = async (req, res, next) => {
  try {
    const fetchedUsers = await UsersServices.getUsers();

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
        new AppError('You have no permission to delete specified user', 403)
      );
    }

    await UsersServices.deleteUser(userID);

    res.status(200).json(new Response('User has been deleted'));
  } catch (err) {
    next(err);
  }
};

exports.getUserBookings = async (req, res, next) => {
  try {
    const userID = parseInt(req.params.id, 10);

    if (req.user.role === 'user' && userID !== req.user.id) {
      return next(
        new AppError(
          "You have no permission to get this user's booked rooms",
          403
        )
      );
    }

    const fetchedUserBookings = await BookedRoomsServices.getUserBookings(
      userID
    );

    res.status(200).json(new Response(null, fetchedUserBookings));
  } catch (err) {
    next(err);
  }
};
