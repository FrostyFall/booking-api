const { Hotel } = require('../models');

exports.createOne = async ({ img, title, description }) => {
  const result = await Hotel.create({
    img,
    title,
    description,
  });

  return result;
};

exports.deleteOne = async (id) => {
  const result = await Hotel.destroy({
    where: {
      id,
    },
  });

  return result;
};

exports.findAll = async () => {
  const result = await Hotel.findAll({ paranoid: false });

  return result;
};

exports.findById = async (id) => {
  const result = await Hotel.findAll({
    where: {
      id,
    },
    paranoid: false,
  });

  return result;
};
