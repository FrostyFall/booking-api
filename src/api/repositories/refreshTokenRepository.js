const { RefreshToken } = require('../models');

exports.createOne = async ({ str, expirationDate, userId }) => {
  const result = await RefreshToken.create({
    str,
    expiration_date: expirationDate,
    user_id: userId,
  });

  return result;
};

exports.findByStr = async (str) => {
  const result = await RefreshToken.findOne({
    where: { str },
    attributes: ['id', 'str', 'expiration_date', 'created_at', 'user_id'],
  });

  return result;
};

exports.transactionDeleteByUserId = async ({ userId, t }) => {
  const result = await RefreshToken.destroy({
    where: {
      user_id: userId,
    },
    transaction: t,
  });

  return result;
};
