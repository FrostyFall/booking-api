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

exports.login = async (email, password) => {
  try {
    const user = await UsersRepo.findByEmail(email);
    const hashedPassword = user[0].dataValues.password;
    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (!isMatch) {
      return {
        status: 'fail',
        message: 'Invalid email or password',
      };
    }

    return {
      status: 'success',
      message: 'User has been logged in',
    };
  } catch (err) {
    throw new AppError('Failed to login user', 500);
  }
};
