const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const { unlink } = require('fs/promises');
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
  Role,
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
  hooks: true,
  onDelete: 'CASCADE',
  sourceKey: 'id',
});

Room.hasOne(BookedRoom, {
  foreignKey: {
    type: DataTypes.INTEGER,
    allowNull: false,
    name: 'room_id',
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

Role.hasMany(UsersRoles, {
  foreignKey: {
    type: DataTypes.INTEGER,
    allowNull: false,
    name: 'role_id',
  },
  sourceKey: 'id',
});

// Hooks
Hotel.addHook('afterDestroy', async (instance, options) => {
  if (instance.img !== null) {
    await unlink(instance.img);
  }

  const relatedRooms = await Room.findAll({
    where: {
      hotel_id: instance.id,
    },
  });

  relatedRooms.forEach(async (room) => {
    if (room.img !== null) {
      await unlink(room.img);
    }
  });

  await Room.destroy({
    where: {
      hotel_id: instance.id,
    },
    truncate: true,
  });
});

Room.addHook('afterDestroy', async (instance, options) => {
  await BookedRoom.destroy({
    where: {
      room_id: instance.id,
    },
    truncate: true,
  });
});

module.exports = db;
