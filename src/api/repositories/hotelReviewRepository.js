const { HotelReview } = require('../models');

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
  });

  return result;
};
