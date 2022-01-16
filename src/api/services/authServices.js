const UserRepo = require('../repositories/userRepository');
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
  const result = await UserRepo.createOne({
    email,
    hashedPass,
    firstName,
    lastName,
    roleID,
  });

  const token = await signToken(result.userID);

  return { userID: result.userID, token };
};

exports.login = async ({ email, password }) => {
  const user = await UserRepo.findByEmail(email);

  if (!user || !(await isValidPassword(password, user.dataValues.password))) {
    throw new AppError('Invalid email or password', 400);
  }

  const userId = user.dataValues.id;
  const token = await signToken(userId);

  return { token };
};
