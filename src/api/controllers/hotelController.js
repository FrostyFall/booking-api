const HotelServices = require('../services/hotelServices');
const Response = require('../../utils/response');

exports.uploadHotelImage = async (req, res, next) => {
  try {
    const { id } = req.params;

    await HotelServices.uploadHotelImage({ id, files: req.files });

    res
      .status(201)
      .json(new Response('Hotel image has been uploaded successfully'));
  } catch (err) {
    next(err);
  }
};

exports.addHotel = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await HotelServices.addHotel({ title, description });

    res.status(201).json(new Response('Hotel has been added successfully'));
  } catch (err) {
    next(err);
  }
};

exports.deleteHotel = async (req, res, next) => {
  try {
    const { id } = req.params;

    await HotelServices.deleteHotel(id);

    res.status(200).json(new Response('Hotel has been deleted successfully'));
  } catch (err) {
    next(err);
  }
};

exports.getHotels = async (req, res, next) => {
  try {
    const { page, amount } = req.query;
    const fetchedHotels = await HotelServices.getHotels({ page, amount });

    res.status(200).json(new Response(null, fetchedHotels));
  } catch (err) {
    next(err);
  }
};

exports.getHotel = async (req, res, next) => {
  try {
    const { id } = req.params;

    const fetchedHotel = await HotelServices.getHotel(id);

    res.status(200).json(new Response(null, fetchedHotel));
  } catch (err) {
    next(err);
  }
};

exports.getHotelFreeRooms = async (req, res, next) => {
  try {
    const { id } = req.params;

    const fetchedFreeRooms = await HotelServices.getHotelFreeRooms(id);

    res.status(200).json(new Response(null, fetchedFreeRooms));
  } catch (err) {
    next(err);
  }
};

exports.addReview = async (req, res, next) => {
  try {
    const { id: hotelID } = req.params;
    const { id: userID } = req.user;
    const { review, stars } = req.body;

    await HotelServices.addReview({ hotelID, userID, review, stars });

    res.status(201).json(new Response('Review has been added successfully'));
  } catch (err) {
    next(err);
  }
};

exports.getReviews = async (req, res, next) => {
  try {
    const { id } = req.params;

    const fetchedReviews = await HotelServices.getReviews(id);

    res.status(200).json(new Response(null, fetchedReviews));
  } catch (err) {
    next(err);
  }
};
