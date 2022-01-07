const { Hotel } = require('../models');

exports.createOne = async ({ title, description, img = null }) => {
  const result = await Hotel.create({
    img,
    title,
    description,
  });

  return result;
};

exports.deleteById = async (id) => {
  const result = await Hotel.destroy({
    where: {
      id,
    },
    individualHooks: true,
  });

  return result;
};

exports.findAll = async ({ limit, offset }) => {
  // FIXME: Insert all fields in query methods
  const result = await Hotel.findAll({ limit, offset });

  return result;
};

exports.findById = async (id) => {
  const result = await Hotel.findOne({
    where: {
      id,
    },
  });

  return result;
};
