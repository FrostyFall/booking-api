const { UserInfo } = require('../models');

exports.findByUserId = async (userId) => {
  const result = await UserInfo.findOne({
    where: { user_id: userId },
    attributes: [
      'id',
      'first_name',
      'last_name',
      'created_at',
      'deleted_at',
      'user_id',
    ],
  });

  return result;
};

exports.transactionDeleteByUserId = async ({ userId, t }) => {
  const result = await UserInfo.destroy({
    where: {
      user_id: userId,
    },
    transaction: t,
  });

  return result;
};
