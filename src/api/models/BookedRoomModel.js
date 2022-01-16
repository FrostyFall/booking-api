module.exports = function (sequelize, DataTypes) {
  const BookedRoom = sequelize.define(
    'BookedRoom',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      booked_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      leave_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      is_cancelled: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
    },
    {
      tableName: 'booked_rooms',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
      deletedAt: 'deleted_at',
      paranoid: true,
    }
  );

  return BookedRoom;
};
