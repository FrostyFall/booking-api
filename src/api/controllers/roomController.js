const RoomServices = require('../services/roomServices');
const Response = require('../../utils/response');

exports.addRoom = async (req, res, next) => {
  try {
    const { hotelID, img, type, cost } = req.body;

    await RoomServices.addRoom({ hotelID, img, type, cost });

    res.status(201).json(new Response('Room has been added successfully'));
  } catch (err) {
    next(err);
  }
};
