const UserRepo = require('../repositories/userRepository');
const HotelReviewRepo = require('../repositories/hotelReviewRepository');
const BookedRoomRepo = require('../repositories/bookedRoomRepository');
const UsersRolesRepo = require('../repositories/usersRolesRepository');
const UserInfoRepo = require('../repositories/userInfoRepository');
const RefreshTokenRepo = require('../repositories/refreshTokenRepository');
const AppError = require('../../utils/appError');
const Email = require('../../utils/email');
const { hashPassword, isValidPassword } = require('../../utils/auth');
const db = require('../../config/DBConnection');
const pagination = require('../../utils/pagination');

exports.updateUserPassword = async ({ userId, newPassword }) => {
  const user = await this.getUserById(userId);

  if (!user) {
    throw new AppError("Specified user doesn't exist", 400);
  }

  const newHashedPassword = await hashPassword(newPassword);
  user.password = newHashedPassword;

  await user.save();
};

exports.updatePassword = async ({ user, currentPassword, newPassword }) => {
  if (!(await isValidPassword(currentPassword, user.password))) {
    throw new AppError('Password is incorrect', 400);
  }

  const currentUser = user;
  const newHashedPassword = await hashPassword(newPassword);
  currentUser.password = newHashedPassword;

  await currentUser.save();
};

exports.getUsers = async ({ page, amount }) => {
  const options = pagination({ page, amount });

  const users = await UserRepo.findAll(options);

  return { users };
};

exports.deleteSelf = async ({ userId, authUserId }) => {
  const user = await this.getUserById(userId);
  const userInfo = await UserInfoRepo.findByUserId(userId);

  if (!user) {
    throw new AppError("Specified user doesn't exist", 400);
  }

  if (userId !== authUserId) {
    throw new AppError('You have no permission to delete this user', 403);
  }

  const t = await db.transaction();
  let result;

  try {
    result = await UserRepo.transactionDelete({ id: userId, t });

    await UserInfoRepo.transactionDeleteByUserId({ userId, t });
    await UsersRolesRepo.transactionDeleteByUserId({ userId, t });
    await HotelReviewRepo.transactionDeleteByUserId({ userId, t });
    await BookedRoomRepo.transactionDeleteByUserId({ userId, t });
    await RefreshTokenRepo.transactionDeleteByUserId({ userId, t });

    await t.commit();
  } catch (error) {
    await t.rollback();
    throw new AppError('Error occured while deleting the room', 500);
  }

  const mail = new Email(
    user.email,
    'Your account has been successfully deleted on Booking API.'
  );
  await mail.send('delete', { firstName: userInfo.first_name });

  return result;
};

exports.getUserById = async (userId) => {
  const user = await UserRepo.findById(userId);

  return user;
};

exports.getUserByEmail = async (email) => {
  const user = await UserRepo.findByEmail(email);

  return { user };
};
