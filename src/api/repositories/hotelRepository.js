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
  const result = await Hotel.findAll({
    limit,
    offset,
    attributes: [
      'id',
      'img',
      'title',
      'description',
      'created_at',
      'deleted_at',
    ],
  });

  return result;
};

exports.findById = async (id) => {
  const result = await Hotel.findOne({
    where: {
      id,
    },
    attributes: [
      'id',
      'img',
      'title',
      'description',
      'created_at',
      'deleted_at',
    ],
  });

  return result;
};
