const { HotelReview } = require('../models');

exports.createOne = async (hotelID, userID, review, stars) => {
  const result = await HotelReview.create({
    hotel_id: hotelID,
    user_id: userID,
    review,
    stars,
  });

  return result;
};

exports.findByHotelId = async (hotelID) => {
  const result = await HotelReview.findAll({
    where: {
      hotel_id: hotelID,
    },
  });

  return result;
};
