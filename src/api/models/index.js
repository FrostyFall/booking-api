const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/DBConnection');

const filebasename = path.basename(__filename);
const db = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    const returnFile =
      file.indexOf('.') !== 0 &&
      file !== filebasename &&
      file.slice(-3) === '.js';
    return returnFile;
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes); // eslint-disable-line import/no-dynamic-require
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Relationships
const {
  Hotel,
  HotelReview,
  Room,
  User,
  BookedRoom,
  UserInfo,
  UserRole,
  UsersRoles,
} = db;

User.hasMany(HotelReview, {
  foreignKey: {
    type: DataTypes.INTEGER,
    allowNull: false,
    name: 'user_id',
  },
  sourceKey: 'id',
});

Hotel.hasMany(HotelReview, {
  foreignKey: {
    type: DataTypes.INTEGER,
    allowNull: false,
    name: 'hotel_id',
  },
  sourceKey: 'id',
});

Hotel.hasMany(Room, {
  foreignKey: {
    type: DataTypes.INTEGER,
    allowNull: false,
    name: 'hotel_id',
  },
  sourceKey: 'id',
});

Room.hasOne(BookedRoom, {
  foreignKey: {
    type: DataTypes.INTEGER,
    allowNull: false,
    name: 'room_id',
    unique: true,
  },
  sourceKey: 'id',
});

User.hasMany(BookedRoom, {
  foreignKey: {
    type: DataTypes.INTEGER,
    allowNull: false,
    name: 'user_id',
  },
  sourceKey: 'id',
});

User.hasOne(UserInfo, {
  foreignKey: {
    type: DataTypes.INTEGER,
    allowNull: false,
    name: 'user_id',
  },
  sourceKey: 'id',
});

User.hasMany(UsersRoles, {
  foreignKey: {
    type: DataTypes.INTEGER,
    allowNull: false,
    name: 'user_id',
  },
  sourceKey: 'id',
});

UserRole.hasMany(UsersRoles, {
  foreignKey: {
    type: DataTypes.INTEGER,
    allowNull: false,
    name: 'role_id',
  },
  sourceKey: 'id',
});

module.exports = db;
