const AnalyticsServices = require('../services/analyticsServices');
const Response = require('../../utils/response');
const catchAsync = require('../../utils/catchAsync');

exports.getMostBookedHotel = catchAsync(async (req, res) => {
  const { month, room_rating: roomRating } = req.query;

  const result = await AnalyticsServices.getMostBookedHotel({
    month,
    roomRating,
  });

  res.status(200).json(new Response(null, result));
});
