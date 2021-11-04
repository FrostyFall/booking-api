const UsersServices = require('../services/usersServices');
const AppError = require('../../config/appError');

exports.getUsers = async (req, res, next) => {
  try {
    const fetchedUsers = await UsersServices.getUsers();

    res.status(200).json(fetchedUsers);
  } catch (err) {
    next(err);
  }
};

exports.deleteSelf = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const authUserID = req.userId;

    if (userId !== authUserID) {
      return next(
        new AppError('You have no access to delete specified user', 401)
      );
    }

    const deletedUserRes = await UsersServices.deleteUser(userId);

    return res.status(200).json(deletedUserRes);
  } catch (err) {
    return next(err);
  }
};
