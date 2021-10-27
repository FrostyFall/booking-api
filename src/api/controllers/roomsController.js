const RoomsServices = require('../services/roomsServices');

exports.addRoom = async (req, res, next) => {
  const { hotelID, img, type, cost } = req.body;

  try {
    const createdRoomRes = await RoomsServices.addRoom(
      hotelID,
      img,
      type,
      cost
    );

    res.status(201).json(createdRoomRes);
  } catch (err) {
    next(err);
  }
};
