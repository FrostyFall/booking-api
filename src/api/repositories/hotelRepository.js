const { Hotel } = require('../models');

exports.createOne = async ({ img, title, description }) => {
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

exports.findAll = async () => {
  const result = await Hotel.findAll(); // Insert ALL fields

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
