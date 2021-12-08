const UserRepo = require('../repositories/userRepository');

exports.getUsers = async () => {
  const users = await UserRepo.findAll();

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
