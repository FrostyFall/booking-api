const { Role } = require('../models');

exports.findById = async (id) => {
  const result = await Role.findOne({
    where: {
      id,
    },
    attributes: ['id', 'role', 'created_at', 'deleted_at'],
  });

  return result;
};

exports.findAll = async () => {
  const result = await Role.findAll({
    attributes: ['id', 'role', 'created_at', 'deleted_at'],
  });

  return result;
};
