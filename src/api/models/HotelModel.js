module.exports = function (sequelize, DataTypes) {
  const Hotel = sequelize.define(
    'Hotel',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'hotels',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
      deletedAt: 'deleted_at',
      paranoid: true,
    }
  );

  return Hotel;
};
