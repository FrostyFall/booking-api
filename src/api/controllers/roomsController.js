const RoomsServices = require('../services/roomsServices');
const Response = require('../../utils/response');

exports.addRoom = async (req, res, next) => {
  try {
    const { hotelID, img, type, cost } = req.body;

    await RoomsServices.addRoom(hotelID, img, type, cost);

    res.status(201).json(new Response('Room has been added successfully'));
  } catch (err) {
    next(err);
  }
};
