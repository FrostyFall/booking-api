const AuthServices = require('../services/authServices');

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

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await AuthServices.login(email, password);

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};
