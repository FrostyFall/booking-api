const HotelsServices = require('../services/hotelsServices');
const Response = require('../../utils/response');

exports.addHotel = async (req, res, next) => {
  try {
    const { img, title, description } = req.body;

    await HotelsServices.addHotel(img, title, description);

    res.status(201).json(new Response('Hotel has been added successfully'));
  } catch (err) {
    next(err);
  }
};

exports.deleteHotel = async (req, res, next) => {
  try {
    const { id } = req.params;

    await HotelsServices.deleteHotel(id);

    res.status(200).json(new Response('Hotel has been deleted successfully'));
  } catch (err) {
    next(err);
  }
};

exports.getHotels = async (req, res, next) => {
  try {
    const fetchedHotels = await HotelsServices.getHotels();

    res.status(200).json(new Response(null, fetchedHotels));
  } catch (err) {
    next(err);
  }
};

exports.getHotel = async (req, res, next) => {
  try {
    const { id } = req.params;

    const fetchedHotel = await HotelsServices.getHotel(id);

    res.status(200).json(new Response(null, fetchedHotel));
  } catch (err) {
    next(err);
  }
};

exports.getHotelFreeRooms = async (req, res, next) => {
  try {
    const { id } = req.params;

    const fetchedFreeRooms = await HotelsServices.getHotelFreeRooms(id);

    res.status(200).json(new Response(null, fetchedFreeRooms));
  } catch (err) {
    next(err);
  }
};

exports.addReview = async (req, res, next) => {
  try {
    const { id: hotelID } = req.params;
    const userID = req.user.id;
    const { review, stars } = req.body;

    await HotelsServices.addReview(hotelID, userID, review, stars);

    res.status(201).json(new Response('Review has been added successfully'));
  } catch (err) {
    next(err);
  }
};

exports.getReviews = async (req, res, next) => {
  try {
    const { id } = req.params;

    const fetchedReviews = await HotelsServices.getReviews(id);

    res.status(200).json(new Response(null, fetchedReviews));
  } catch (err) {
    next(err);
  }
};
