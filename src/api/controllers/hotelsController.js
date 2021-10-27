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

exports.deleteHotel = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedHotelRes = await HotelsServices.deleteHotel(id);

    res.status(200).json(deletedHotelRes);
  } catch (err) {
    next(err);
  }
};

exports.getHotels = async (req, res, next) => {
  try {
    const fetchedHotels = await HotelsServices.getHotels();

    res.status(200).json(fetchedHotels);
  } catch (err) {
    next(err);
  }
};

exports.getHotel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const fetchedHotel = await HotelsServices.getHotel(id);

    res.status(200).json(fetchedHotel);
  } catch (err) {
    next(err);
  }
};
