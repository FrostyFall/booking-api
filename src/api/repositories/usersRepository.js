const { User } = require('../models');

exports.findAll = async () => {
  const result = await User.findAll();

  return result;
};
