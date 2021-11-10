const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('./appError');

exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

exports.isValidPassword = async (password, hashedPassword) => {
  const isValid = await bcrypt.compare(password, hashedPassword);

  return isValid;
};

exports.signToken = async (userId) => {
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
        str: token,
        expiresIn,
      });
    });
  });
};
