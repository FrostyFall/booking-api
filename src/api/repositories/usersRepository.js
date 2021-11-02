const { User, UserInfo } = require('../models');

exports.findAll = async () => {
  const result = await User.findAll();

  return result;
};

exports.findByEmail = async (email) => {
  const result = await User.findAll({
    where: {
      email,
    },
  });

  return result;
};

exports.createOne = async (email, password, firstName, lastName) => {
  const user = await User.create({
    email,
    password,
  });
  const userInfo = await UserInfo.create({
    user_id: user.id,
    first_name: firstName,
    last_name: lastName,
  });

  return {
    user,
    userInfo,
  };
};
