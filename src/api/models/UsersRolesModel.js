module.exports = function (sequelize, DataTypes) {
  const UsersRoles = sequelize.define(
    'UsersRoles',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      tableName: 'users_roles',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
      deletedAt: 'deleted_at',
      paranoid: true,
    }
  );

  return UsersRoles;
};
