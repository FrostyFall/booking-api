const AnalyticsServices = require('../services/analyticsServices');
const Response = require('../../utils/response');

exports.getMostBookedHotel = async (req, res, next) => {
  try {
    const { month, room_rating: roomRating } = req.query;

    const result = await AnalyticsServices.getMostBookedHotel({
      month,
      roomRating,
    });

    res.status(200).json(new Response(null, result));
  } catch (err) {
    next(err);
  }
};
