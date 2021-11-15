const { UserRole } = require('../models');

exports.findById = async (id) => {
  const result = await UserRole.findAll({
    where: {
      id,
    },
  });

  return result[0].dataValues;
};

exports.getAllRoles = async () => {
  const result = await UserRole.findAll();

  return result;
};
