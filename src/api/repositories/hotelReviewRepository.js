const { HotelReview } = require('../models');

exports.transactionDeleteByUserId = async ({ userId, t }) => {
  const result = await HotelReview.destroy({
    where: {
      user_id: userId,
    },
    transaction: t,
  });

  return result;
};

exports.transactionDeleteByHotelId = async ({ hotelId, t }) => {
  const result = await HotelReview.destroy({
    where: {
      hotel_id: hotelId,
    },
    transaction: t,
  });

  return result;
};

exports.createOne = async ({ hotelID, userID, review, rating }) => {
  const result = await HotelReview.create({
    hotel_id: hotelID,
    user_id: userID,
    review,
    rating,
  });

  return result;
};

exports.findByHotelId = async ({ hotelID, limit, offset }) => {
  const result = await HotelReview.findAll({
    where: {
      hotel_id: hotelID,
    },
    limit,
    offset,
    attributes: [
      'id',
      'review',
      'rating',
      'created_at',
      'deleted_at',
      'user_id',
      'hotel_id',
    ],
  });

  return result;
};
