const UsersRepo = require('../repositories/usersRepository');
const AppError = require('../../config/appError');
const {
  hashPassword,
  isValidPassword,
  signToken,
} = require('../../utils/auth');

exports.signup = async (email, password, firstName, lastName) => {
  try {
    const hashedPass = await hashPassword(password);

    const result = await UsersRepo.createOne(
      email,
      hashedPass,
      firstName,
      lastName
    );

    const token = await signToken(result.user.dataValues.id);

    return {
      status: 'success',
      data: result,
      token,
    };
  } catch (err) {
    throw new AppError('Failed to signup user', 500);
  }
};

exports.login = async (email, password) => {
  try {
    const user = await UsersRepo.findByEmail(email);
    const { password: hashedPassword, id: userId } = user.dataValues;
    const isValid = await isValidPassword(password, hashedPassword);

    if (!isValid) {
      throw new AppError('Invalid email or password', 500);
    }

    const token = await signToken(userId);

    return {
      status: 'success',
      message: 'User has been logged in',
      token,
    };
  } catch (err) {
    throw new AppError(err.message, 500);
  }
};
