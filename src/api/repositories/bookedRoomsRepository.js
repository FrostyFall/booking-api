const { BookedRoom } = require('../models');

exports.findByRoomId = async (roomID) => {
  const result = await BookedRoom.findAll({
    where: {
      room_id: roomID,
    },
  });

  return result;
};
