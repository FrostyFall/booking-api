const UsersRepo = require('../repositories/usersRepository');

exports.getUsers = async () => {
  const users = await UsersRepo.findAll();

  return { users };
};

exports.deleteUser = async (userId) => {
  return await UsersRepo.deleteById(userId);
};
