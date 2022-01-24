const { QueryTypes } = require('sequelize');
const { User, UserInfo, UsersRoles } = require('../models');
const sequelize = require('../../config/DBConnection');

exports.findAll = async (infoOptions, { limit, offset }) => {
  let infoDetailsStr = '';
  for (const [key, value] of Object.entries(infoOptions)) {
    infoDetailsStr += ` AND uinf.${key} = '${value}'`;
  }

  const queryStr = `SELECT users.id, users.email, users.password, users.created_at, uinf.first_name, uinf.last_name FROM user_info AS uinf INNER JOIN users ON users.deleted_at IS NULL AND uinf.user_id = users.id${infoDetailsStr}${
    limit !== undefined ? ` LIMIT ${limit} OFFSET ${offset};` : ';'
  }`;

  const result = await sequelize.query(queryStr, {
    type: QueryTypes.SELECT,
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
