const { UsersRoles } = require('../models');

exports.findByUserId = async (id) => {
  const result = await UsersRoles.findOne({
    where: {
      user_id: id,
    },
  });

  return result;
};

exports.transactionDeleteByUserId = async ({ userId, t }) => {
  const result = await UsersRoles.destroy({
    where: {
      user_id: userId,
    },
    transaction: t,
  });

  return result;
};
