const { UserInfo } = require('../models');

exports.updateByUserId = async ({ userId, newInfo }) => {
  const result = await UserInfo.update(newInfo, { where: { user_id: userId } });

  return result;
};

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
