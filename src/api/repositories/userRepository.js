const { User, UserInfo, UsersRoles } = require('../models');

exports.findAll = async ({ limit, offset }) => {
  const result = await User.findAll({ limit, offset });

  return result;
};

exports.findById = async (id) => {
  const result = await User.findOne({
    where: {
      id,
    },
  });

  return result;
};

exports.findByEmail = async (email) => {
  const result = await User.findOne({
    where: {
      email,
    },
  });

  return result;
};

exports.createOne = async ({
  email,
  hashedPass: password,
  firstName,
  lastName,
  roleID,
}) => {
  const user = await User.create({
    email,
    password,
  });
  await UserInfo.create({
    user_id: user.id,
    first_name: firstName,
    last_name: lastName,
  });
  await UsersRoles.create({
    user_id: user.id,
    role_id: roleID,
  });

  return {
    userID: user.id,
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
