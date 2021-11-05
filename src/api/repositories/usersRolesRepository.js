const { UsersRoles } = require('../models');

exports.findByUserId = async (id) => {
  const result = await UsersRoles.findAll({
    where: {
      user_id: id,
    },
  });

  return result[0].dataValues;
};
