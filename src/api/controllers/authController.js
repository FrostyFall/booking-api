const AuthServices = require('../services/authServices');
const Response = require('../../utils/response');
const catchAsync = require('../../utils/catchAsync');

exports.signup = catchAsync(async (req, res) => {
  const { email, password, passwordConfirm, firstName, lastName, role } =
    req.body;

  const result = await AuthServices.signup({
    email,
    password,
    passwordConfirm,
    firstName,
    lastName,
    role,
  });

  res.status(201).json(new Response('User has been signed up', result));
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const result = await AuthServices.login({ email, password });

  res.status(201).json(new Response('User has been logged in', result));
});

exports.token = catchAsync(async (req, res) => {
  const { email, refreshToken } = req.body;

  const result = await AuthServices.token({ email, refreshToken });

  res.status(200).json(new Response('Access token has been provided', result));
});

exports.disableToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;

  const result = await AuthServices.disableToken(refreshToken);

  res.status(200).json(new Response('Refresh token has been disabled', result));
});
