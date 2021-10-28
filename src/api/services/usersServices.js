const { User } = require('../models');
const AppError = require('../../config/appError');

exports.getUsers = async () => {
  try {
    const users = await User.findAll();

    return {
      status: 'success',
      data: users,
    };
  } catch (err) {
    throw new AppError('Failed to get users', 500);
  }
};
