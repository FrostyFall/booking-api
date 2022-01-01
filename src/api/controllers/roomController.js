const RoomServices = require('../services/roomServices');
const Response = require('../../utils/response');

exports.uploadRoomImage = async (req, res, next) => {
  try {
    const { id } = req.params;

    await RoomServices.uploadRoomImage({ id, files: req.files });

    res
      .status(201)
      .json(new Response('Room image has been uploaded successfully'));
  } catch (err) {
    next(err);
  }
};

exports.addRoom = async (req, res, next) => {
  try {
    const { hotelID, img, type, cost } = req.body;

    await RoomServices.addRoom({ hotelID, img, type, cost });

    res.status(201).json(new Response('Room has been added successfully'));
  } catch (err) {
    next(err);
  }
};
