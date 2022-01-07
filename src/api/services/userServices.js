const UserRepo = require('../repositories/userRepository');
const pagination = require('../../utils/pagination');

exports.getUsers = async ({ page, amount }) => {
  const options = pagination({ page, amount });

  const users = await UserRepo.findAll(options);

  return { users };
};

exports.deleteUser = async (userId) => {
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
