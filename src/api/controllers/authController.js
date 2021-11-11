const AuthServices = require('../services/authServices');
const Response = require('../../utils/response');

exports.signup = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, roleID = 1 } = req.body;

    const result = await AuthServices.signup(
      email,
      password,
      firstName,
      lastName,
      roleID
    );

    res.status(201).json(new Response(null, result));
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await AuthServices.login(email, password);

    res.status(201).json(new Response('User has been logged in', result));
  } catch (err) {
    next(err);
  }
};
