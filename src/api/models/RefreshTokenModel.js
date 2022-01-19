module.exports = function (sequelize, DataTypes) {
  const RefreshToken = sequelize.define(
    'RefreshToken',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      str: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expiration_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: 'refresh_tokens',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
      paranoid: false,
    }
  );

  return RefreshToken;
};
