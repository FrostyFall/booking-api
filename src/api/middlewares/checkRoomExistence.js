const RoomRepo = require('../repositories/roomRepository');
const AppError = require('../../utils/appError');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const room = await RoomRepo.findById(id);

  if (!room) {
    next(new AppError('Specified room not found', 404));
  }

  next();
};
