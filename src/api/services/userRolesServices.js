const UserRolesRepo = require('../repositories/userRolesRepository');

exports.getRoles = async () => {
  const roles = await UserRolesRepo.getAllRoles();

  return roles;
};
