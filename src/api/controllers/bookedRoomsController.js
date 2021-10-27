const BookedRoomsServices = require('../services/bookedRoomsServices');

exports.bookRoom = async (req, res, next) => {
  try {
    const { roomID, userID, bookedDate, leaveDate } = req.body;

    const bookedRoomRes = await BookedRoomsServices.bookRoom(
      roomID,
      userID,
      bookedDate,
      leaveDate
    );

    res.status(201).json(bookedRoomRes);
  } catch (err) {
    next(err);
  }
};

exports.cancelBooking = async (req, res, next) => {
  try {
    const { id } = req.params;

    const cancelledBookingRes = await BookedRoomsServices.cancelBooking(id);

    res.status(201).json(cancelledBookingRes);
  } catch (err) {
    next(err);
  }
};
