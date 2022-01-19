const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRolesServices = require('../api/services/roleServices');
const AppError = require('./appError');

exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

exports.isValidPassword = async (password, hashedPassword) => {
  const isValid = await bcrypt.compare(password, hashedPassword);

  return isValid;
};

exports.signToken = async ({ expiresIn, userId }) => {
  const secsSinceUnixEpoch = Math.floor(Date.now() / 1000);
  const expiresInNum = parseInt(expiresIn, 10);

  const payload = {
    sub: userId,
    iat: secsSinceUnixEpoch,
    exp: secsSinceUnixEpoch + expiresInNum,
  };

  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
      if (err) {
        reject(new AppError('Failed to create a token', 500));
      }

      resolve({
        str: token,
        expiresIn: expiresInNum,
      });
    });
  });
};

exports.findRoleID = async (role) => {
  let roleID = -1;
  const loweredRole = role.toLowerCase();
  const roles = await UserRolesServices.getRoles();
  const roleNames = roles.map((singleRole) => {
    return { id: singleRole.id, role: singleRole.role };
  });

  roleNames.forEach((singleRole) => {
    if (singleRole.role === loweredRole) {
      roleID = singleRole.id;
    }
  });

  return roleID;
};
