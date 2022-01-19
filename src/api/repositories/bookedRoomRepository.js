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
    attributes: [
      'id',
      'move_in_date',
      'leave_date',
      'is_cancelled',
      'created_at',
      'deleted_at',
      'room_id',
      'user_id',
    ],
  });

  return result;
};

exports.findByRoomId = async (roomID) => {
  const result = await BookedRoom.findAll({
    where: {
      room_id: roomID,
    },
    attributes: [
      'id',
      'move_in_date',
      'leave_date',
      'is_cancelled',
      'created_at',
      'deleted_at',
      'room_id',
      'user_id',
    ],
  });

  return result;
};

exports.findByUserId = async (userID) => {
  const result = await BookedRoom.findAll({
    where: {
      user_id: userID,
    },
    attributes: [
      'id',
      'move_in_date',
      'leave_date',
      'is_cancelled',
      'created_at',
      'deleted_at',
      'room_id',
      'user_id',
    ],
  });

  return result;
};

exports.findAll = async ({ limit, offset }) => {
  const result = await BookedRoom.findAll({
    limit,
    offset,
    attributes: [
      'id',
      'move_in_date',
      'leave_date',
      'is_cancelled',
      'created_at',
      'deleted_at',
      'room_id',
      'user_id',
    ],
  });

  return result;
};

exports.createOne = async ({ roomID, userID, moveInDate, leaveDate }) => {
  const result = await BookedRoom.create({
    room_id: roomID,
    user_id: userID,
    move_in_date: moveInDate,
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
    attributes: [
      'id',
      'move_in_date',
      'leave_date',
      'is_cancelled',
      'created_at',
      'deleted_at',
      'room_id',
      'user_id',
    ],
  });

  return result;
};

exports.transactionDeleteByRoomId = async ({ roomId, t }) => {
  const result = await BookedRoom.destroy({
    where: {
      room_id: roomId,
    },
    transaction: t,
  });

  return result;
};

exports.transactionDeleteByUserId = async ({ userId, t }) => {
  const result = await BookedRoom.destroy({
    where: {
      user_id: userId,
    },
    transaction: t,
  });

  return result;
};
