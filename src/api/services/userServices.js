const UserRepo = require('../repositories/userRepository');

exports.getUsers = async ({ page, amount }) => {
  let limit;
  let offset = 0;

  if (!isNaN(amount)) {
    limit = parseInt(amount, 10);
  }

  if (!isNaN(page) && !isNaN(limit)) {
    offset = (parseInt(page, 10) - 1) * limit;
  }

  const users = await UserRepo.findAll({ limit, offset });

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
