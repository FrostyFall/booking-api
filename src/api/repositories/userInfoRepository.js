const { UserInfo } = require('../models');

exports.transactionDeleteByUserId = async ({ userId, t }) => {
  const result = await UserInfo.destroy({
    where: {
      user_id: userId,
    },
    transaction: t,
  });

  return result;
};
