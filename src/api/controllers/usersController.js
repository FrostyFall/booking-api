const UsersServices = require('../services/usersServices');

exports.getUsers = async (req, res, next) => {
  try {
    const fetchedUsers = await UsersServices.getUsers();

    res.status(200).json(fetchedUsers);
  } catch (err) {
    next(err);
  }
};
