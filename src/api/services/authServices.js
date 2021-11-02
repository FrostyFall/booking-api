const bcrypt = require('bcryptjs');
const UsersRepo = require('../repositories/usersRepository');
const AppError = require('../../config/appError');

const hashPass = async (password) => {
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

exports.signup = async (email, password, firstName, lastName) => {
  try {
    const hashedPass = await hashPass(password);

    const result = await UsersRepo.createOne(
      email,
      hashedPass,
      firstName,
      lastName
    );

    return {
      status: 'success',
      data: result,
    };
  } catch (err) {
    throw new AppError('Failed to signup user', 500);
  }
};
