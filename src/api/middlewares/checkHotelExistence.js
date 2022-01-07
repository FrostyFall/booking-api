const HotelRepo = require('../repositories/hotelRepository');
const AppError = require('../../utils/appError');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const hotel = await HotelRepo.findById(id);

  if (!hotel) {
    next(new AppError('Specified hotel not found', 404));
  }

  next();
};
