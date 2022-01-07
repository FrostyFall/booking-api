const { BookedRoom } = require('../models');

exports.findByRoomId = async (roomID) => {
  const result = await BookedRoom.findAll({
    where: {
      room_id: roomID,
    },
  });

  return result;
};

exports.findByUserId = async (userID) => {
  const result = await BookedRoom.findAll({
    where: {
      user_id: userID,
    },
  });

  return result;
};

exports.findAll = async ({ limit, offset }) => {
  const result = await BookedRoom.findAll({ limit, offset });

  return result;
};

exports.createOne = async ({ roomID, userID, bookedDate, leaveDate }) => {
  const result = await BookedRoom.create({
    room_id: roomID,
    user_id: userID,
    booked_date: bookedDate,
    leave_date: leaveDate,
  });

  return result;
};

exports.deleteById = async (id) => {
  const result = await BookedRoom.destroy({
    where: {
      id,
    },
  });

  return result;
};

exports.findById = async (id) => {
  const result = await BookedRoom.findOne({
    where: {
      id,
    },
  });

  return result;
};
