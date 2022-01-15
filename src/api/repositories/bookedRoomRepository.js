const { Op } = require('sequelize');
const { BookedRoom } = require('../models');

exports.findActiveOrCancelledRooms = async (roomId) => {
  const currentDate = new Date();

  const result = await BookedRoom.findAll({
    where: {
      room_id: roomId,
      [Op.not]: [
        {
          [Op.or]: [
            {
              leave_date: {
                [Op.lt]: currentDate,
              },
            },
            {
              is_cancelled: {
                [Op.eq]: true,
              },
            },
          ],
        },
      ],
    },
  });

  return result;
};

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
    is_cancelled: false,
  });

  return result;
};

exports.cancelById = async (id) => {
  const result = await BookedRoom.update(
    { is_cancelled: 1 },
    { where: { id } }
  );

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

exports.transactionDelete = async ({ roomId, t }) => {
  const result = await BookedRoom.destroy({
    where: {
      room_id: roomId,
    },
    transaction: t,
  });

  return result;
};
