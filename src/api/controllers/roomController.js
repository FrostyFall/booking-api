const RoomServices = require('../services/roomServices');
const Response = require('../../utils/response');
const catchAsync = require('../../utils/catchAsync');

exports.uploadRoomImage = catchAsync(async (req, res) => {
  const { id } = req.params;

  await RoomServices.uploadRoomImage({ id, files: req.files });

  res
    .status(201)
    .json(new Response('Room image has been uploaded successfully'));
});

exports.addRoom = catchAsync(async (req, res) => {
  const { hotelID, rating, cost } = req.body;

  await RoomServices.addRoom({ hotelID, rating, cost });

  res.status(201).json(new Response('Room has been added successfully'));
});

exports.deleteRoom = catchAsync(async (req, res) => {
  const { id } = req.params;

  await RoomServices.deleteRoom(id);

  res.status(201).json(new Response('Room has been deleted successfully'));
});
