const { Hotel } = require('../models');

exports.updateImgById = async ({ id, path }) => {
  const result = await Hotel.update({ img: './' + path }, { where: { id } });

  return result;
};

exports.createOne = async ({ title, description, img = null }) => {
  const result = await Hotel.create({
    img,
    title,
    description,
  });

  return result;
};

exports.transactionDelete = async ({ id, t }) => {
  const result = await Hotel.destroy({
    where: {
      id,
    },
    transaction: t,
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
