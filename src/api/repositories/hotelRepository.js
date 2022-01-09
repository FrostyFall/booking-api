const { unlink } = require('fs/promises');
const { Hotel } = require('../models');
const db = require('../../config/DBConnection');
const AppError = require('../../utils/appError');

exports.createOne = async ({ title, description, img = null }) => {
  const result = await Hotel.create({
    img,
    title,
    description,
  });

  return result;
};

exports.deleteById = async ({ id, img }) => {
  const t = await db.transaction();
  let result;

  try {
    result = await Hotel.destroy({
      where: {
        id,
      },
      individualHooks: true,
      transaction: t,
    });

    if (img !== null) {
      await unlink(img);
    }

    await t.commit();
  } catch (error) {
    await t.rollback();
    throw new AppError('Error occured while deleting the hotel', 500);
  }

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
