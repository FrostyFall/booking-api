const { UsersRoles } = require('../models');

exports.findByUserId = async (id) => {
  const result = await UsersRoles.findOne({
    where: {
      user_id: id,
    },
  });

  return result;
};
