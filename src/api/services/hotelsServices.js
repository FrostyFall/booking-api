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

exports.deleteHotel = async (hotelID) => {
  try {
    await Hotel.destroy({
      where: {
        id: hotelID,
      },
    });

    return {
      status: 'success',
      message: 'Hotel has been deleted successfully',
    };
  } catch (err) {
    throw new AppError('Failed to delete a hotel', 500);
  }
};

exports.getHotels = async () => {
  try {
    const hotels = await Hotel.findAll({ paranoid: false });

    return {
      status: 'success',
      data: hotels,
    };
  } catch (err) {
    throw new AppError('Failed to get all hotels', 500);
  }
};
