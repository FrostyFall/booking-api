const HotelServices = require('../services/hotelServices');
const Response = require('../../utils/response');
const catchAsync = require('../../utils/catchAsync');

exports.uploadHotelImage = catchAsync(async (req, res) => {
  const { id } = req.params;

  await HotelServices.uploadHotelImage({ id, files: req.files });

  res
    .status(201)
    .json(new Response('Hotel image has been uploaded successfully'));
});

exports.addHotel = catchAsync(async (req, res) => {
  const { title, description } = req.body;

  await HotelServices.addHotel({ title, description });

  res.status(201).json(new Response('Hotel has been added successfully'));
});

exports.deleteHotel = catchAsync(async (req, res) => {
  const { id } = req.params;

  await HotelServices.deleteHotel(id);

  res.status(200).json(new Response('Hotel has been deleted successfully'));
});

exports.getHotels = catchAsync(async (req, res) => {
  const { page, amount } = req.query;
  const fetchedHotels = await HotelServices.getHotels({ page, amount });

  res.status(200).json(new Response(null, fetchedHotels));
});

exports.getHotel = catchAsync(async (req, res) => {
  const { id } = req.params;

  const fetchedHotel = await HotelServices.getHotel(id);

  res.status(200).json(new Response(null, fetchedHotel));
});

exports.getHotelFreeRooms = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { page, amount } = req.query;

  const fetchedFreeRooms = await HotelServices.getHotelFreeRooms({
    page,
    amount,
    hotelID: id,
  });

  res.status(200).json(new Response(null, fetchedFreeRooms));
});

exports.addReview = catchAsync(async (req, res) => {
  const { id: hotelID } = req.params;
  const { id: userID } = req.user;
  const { review, rating } = req.body;

  await HotelServices.addReview({ hotelID, userID, review, rating });

  res.status(201).json(new Response('Review has been added successfully'));
});

exports.getReviews = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { page, amount } = req.query;

  const fetchedReviews = await HotelServices.getReviews({ id, page, amount });

  res.status(200).json(new Response(null, fetchedReviews));
});
