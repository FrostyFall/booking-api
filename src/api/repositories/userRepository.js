const { User, UserInfo, UsersRoles } = require('../models');

exports.findAll = async ({ limit, offset }) => {
  const result = await User.findAll({
    limit,
    offset,
    attributes: ['id', 'email', 'password', 'created_at', 'deleted_at'],
  });

  return result;
};

exports.findById = async (id) => {
  const result = await User.findOne({
    where: {
      id,
    },
    attributes: ['id', 'email', 'password', 'created_at', 'deleted_at'],
  });

  return result;
};

exports.findByEmail = async (email) => {
  const result = await User.findOne({
    where: {
      email,
    },
    attributes: ['id', 'email', 'password', 'created_at', 'deleted_at'],
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
    userId: user.id,
  };
};

exports.transactionDelete = async ({ id, t }) => {
  const result = await User.destroy({
    where: {
      id,
    },
    transaction: t,
  });

  return result;
};
