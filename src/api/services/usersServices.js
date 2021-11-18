const UsersRepo = require('../repositories/usersRepository');

exports.getUsers = async () => {
  const users = await UsersRepo.findAll();

  return { users };
};

exports.deleteUser = async (userId) => {
  return await UsersRepo.deleteById(userId);
};

exports.getUserById = async (userId) => {
  const user = await UsersRepo.findById(userId);

  return { user };
};

exports.getUserByEmail = async (email) => {
  const user = await UsersRepo.findByEmail(email);

  return { user };
};
