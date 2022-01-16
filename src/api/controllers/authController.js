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

  res.status(201).json(new Response(null, result));
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const result = await AuthServices.login({ email, password });

  res.status(201).json(new Response('User has been logged in', result));
});
