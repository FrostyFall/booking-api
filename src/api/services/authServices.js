const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UsersRepo = require('../repositories/usersRepository');
const AppError = require('../../config/appError');

const hashPass = async (password) => {
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

const isValidPassword = async (password, hashedPassword) => {
  const isValid = await bcrypt.compare(password, hashedPassword);

  return isValid;
};

const signToken = async (userId) => {
  const secsSinceUnixEpoch = Math.floor(Date.now() / 1000);
  const expiresIn = parseInt(process.env.JWT_EXPIRES_IN, 10);

  const payload = {
    sub: userId,
    iat: secsSinceUnixEpoch,
    exp: secsSinceUnixEpoch + expiresIn,
  };

  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
      if (err) {
        reject(new AppError('Failed to create a token', 500));
      }

      resolve({
        str: 'Bearer ' + token,
        expiresIn,
      });
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
