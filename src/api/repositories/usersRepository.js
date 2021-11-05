const { User, UserInfo, UsersRoles } = require('../models');

exports.findAll = async () => {
  const result = await User.findAll();

  return result;
};

exports.findById = async (id) => {
  const result = await User.findAll({
    where: {
      id,
    },
  });

  return result[0];
};

exports.findByEmail = async (email) => {
  const result = await User.findAll({
    where: {
      email,
    },
  });

  return result[0];
};

exports.createOne = async (email, password, firstName, lastName, roleID) => {
  const user = await User.create({
    email,
    password,
  });
  const userInfo = await UserInfo.create({
    user_id: user.id,
    first_name: firstName,
    last_name: lastName,
  });
  const usersRoles = await UsersRoles.create({
    user_id: user.id,
    role_id: roleID,
  });

  return {
    user,
    userInfo,
    usersRoles,
  };
};

exports.deleteById = async (id) => {
  const deletedUser = await User.destroy({
    where: {
      id,
    },
  });

  return deletedUser;
};
