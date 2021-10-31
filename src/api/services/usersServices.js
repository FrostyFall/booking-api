const UsersRepo = require('../repositories/usersRepository');
const AppError = require('../../config/appError');

exports.getUsers = async () => {
  try {
    const users = await UsersRepo.findAll();

    return {
      status: 'success',
      data: users,
    };
  } catch (err) {
    throw new AppError('Failed to get users', 500);
  }
};
