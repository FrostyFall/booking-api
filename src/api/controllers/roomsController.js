const RoomsServices = require('../services/roomsServices');
const HotelsServices = require('../services/hotelsServices');
const Response = require('../../utils/response');
const AppError = require('../../utils/appError');

exports.addRoom = async (req, res, next) => {
  try {
    const { hotelID, img, type, cost } = req.body;

    if (!(await HotelsServices.getHotel(hotelID)).hotel) {
      return next(new AppError('Specified hotel not found', 400));
    }

    await RoomsServices.addRoom(hotelID, img, type, cost);

    res.status(201).json(new Response('Room has been added successfully'));
  } catch (err) {
    next(err);
  }
};
