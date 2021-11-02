const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UsersRepo = require('../repositories/usersRepository');
const AppError = require('../../config/appError');

const hashPass = async (password) => {
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

const signToken = async (userId) => {
  const payload = {
    sub: userId,
    iat: Date.now(),
  };
  const options = {
    expiresIn: process.env.JWT_EXPIRES_IN,
  };

  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
      if (err) {
        reject(new AppError('Failed to create a token', 500));
      }

      resolve(token);
    });
  });
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
    const hashedPassword = user.dataValues.password;
    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (!isMatch) {
      return {
        status: 'fail',
        message: 'Invalid email or password',
      };
    }

    const token = await signToken(user.dataValues.id);

    return {
      status: 'success',
      message: 'User has been logged in',
      token,
    };
  } catch (err) {
    throw new AppError('Failed to login user', 500);
  }
};
