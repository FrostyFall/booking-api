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

exports.deleteUser = async (userId) => {
  try {
    await UsersRepo.deleteById(userId);

    return {
      status: 'success',
      message: 'User has been deleted',
    };
  } catch (err) {
    throw new AppError('Failed to delete user', 500);
  }
};
