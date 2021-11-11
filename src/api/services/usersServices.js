const UsersRepo = require('../repositories/usersRepository');

exports.getUsers = async () => {
  const users = await UsersRepo.findAll();

  return {
    status: 'success',
    data: users,
  };
};

exports.deleteUser = async (userId) => {
  await UsersRepo.deleteById(userId);

  return {
    status: 'success',
    message: 'User has been deleted',
  };
};
