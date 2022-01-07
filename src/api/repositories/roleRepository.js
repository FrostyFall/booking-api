const { Role } = require('../models');

exports.findById = async (id) => {
  const result = await Role.findOne({
    where: {
      id,
    },
  });

  return result;
};

exports.findAll = async () => {
  const result = await Role.findAll();

  return result;
};
