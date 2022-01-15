const UserRepo = require('../repositories/userRepository');
const AppError = require('../../utils/appError');
const pagination = require('../../utils/pagination');

exports.getUsers = async ({ page, amount }) => {
  const options = pagination({ page, amount });

  const users = await UserRepo.findAll(options);

  return { users };
};

exports.deleteSelf = async ({ userId, authUserId }) => {
  if (!(await this.getUserById(userId))) {
    throw new AppError("Specified user doesn't exist", 400);
  }

  if (userId !== authUserId) {
    throw new AppError('You have no permission to delete this user', 403);
  }

  return await UserRepo.deleteById(userId);
};

exports.getUserById = async (userId) => {
  const user = await UserRepo.findById(userId);

  return { user };
};

exports.getUserByEmail = async (email) => {
  const user = await UserRepo.findByEmail(email);

  return { user };
};
