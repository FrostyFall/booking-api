module.exports = function (sequelize, DataTypes) {
  const Role = sequelize.define(
    'Role',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'user_roles',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
      deletedAt: 'deleted_at',
      paranoid: true,
    }
  );

  return Role;
};
