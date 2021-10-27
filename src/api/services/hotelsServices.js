const { Hotel } = require('../models');
const AppError = require('../../config/appError');

exports.addHotel = async (img, title, description) => {
  try {
    await Hotel.create({
      img,
      title,
      description,
    });

    return {
      status: 'success',
      message: 'Hotel has been added successfully',
    };
  } catch (err) {
    throw new AppError('Failed to add a hotel', 500);
  }
};
