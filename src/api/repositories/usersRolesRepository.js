const { UsersRoles } = require('../models');

exports.findByUserId = async (id) => {
  const result = await UsersRoles.findOne({
    where: {
      user_id: id,
    },
    attributes: ['id', 'created_at', 'deleted_at', 'user_id', 'role_id'],
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
