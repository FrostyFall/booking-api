const UserRepo = require('../repositories/userRepository');
const RefreshTokenRepo = require('../repositories/refreshTokenRepository');
const UserServices = require('./userServices');
const AppError = require('../../utils/appError');
const { findRoleID } = require('../../utils/auth');
const {
  hashPassword,
  isValidPassword,
  signToken,
} = require('../../utils/auth');

exports.signup = async ({
  email,
  password,
  passwordConfirm,
  firstName,
  lastName,
  role,
}) => {
  if ((await UserServices.getUserByEmail(email)).user) {
    throw new AppError('This user already exists', 400);
  }

  const roleID = await findRoleID(role);

  if (roleID === -1) {
    throw new AppError('Invalid user role', 400);
  }

  if (password !== passwordConfirm) {
    throw new AppError('Invalid password confirmation', 400);
  }

  const hashedPass = await hashPassword(password);
  const { userId } = await UserRepo.createOne({
    email,
    hashedPass,
    firstName,
    lastName,
    roleID,
  });

  const accessToken = await signToken({
    userId,
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  });
  const refreshToken = await signToken({
    userId,
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });
  const { str: refTokenStr, expiresIn: refTokenExpiresIn } = refreshToken;

  await RefreshTokenRepo.createOne({
    str: refTokenStr,
    expirationDate: Date.now() + refTokenExpiresIn * 1000,
    userId,
  });

  return { userId, tokens: { accessToken, refreshToken } };
};

exports.login = async ({ email, password }) => {
  const user = await UserRepo.findByEmail(email);

  if (!user || !(await isValidPassword(password, user.dataValues.password))) {
    throw new AppError('Invalid email or password', 400);
  }

  const userId = user.dataValues.id;
  const accessToken = await signToken({
    userId,
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  });
  const refreshToken = await signToken({
    userId,
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });
  const { str: refTokenStr, expiresIn: refTokenExpiresIn } = refreshToken;

  await RefreshTokenRepo.createOne({
    str: refTokenStr,
    expirationDate: Date.now() + refTokenExpiresIn * 1000,
    userId,
  });

  return { userId, tokens: { accessToken, refreshToken } };
};

exports.token = async ({ email, refreshToken }) => {
  const token = await RefreshTokenRepo.findByStr(refreshToken);

  if (!token || new Date(token.expiration_date) < new Date()) {
    throw new AppError('Provided refresh token is not valid', 400);
  }

  const userId = token.user_id;
  const user = await UserRepo.findById(userId);

  if (!user) {
    throw new AppError(
      "User who possesses provided refresh token doesn't exist",
      400
    );
  }

  if (user.email !== email) {
    throw new AppError(
      "Provided refresh token doesn't belong to specified user",
      400
    );
  }

  const accessToken = await signToken({
    userId,
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  });

  return { token: accessToken };
};

exports.disableToken = async (refreshToken) => {
  if (!(await RefreshTokenRepo.findByStr(refreshToken))) {
    throw new AppError('Provided refresh token is not valid', 400);
  }

  await RefreshTokenRepo.deleteByStr(refreshToken);

  return null;
};
