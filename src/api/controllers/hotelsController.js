const HotelsServices = require('../services/hotelsServices');

exports.addHotel = async (req, res, next) => {
  const { img, title, description } = req.body;

  try {
    const createdHotelRes = await HotelsServices.addHotel(
      img,
      title,
      description
    );

    res.status(201).json(createdHotelRes);
  } catch (err) {
    next(err);
  }
};
