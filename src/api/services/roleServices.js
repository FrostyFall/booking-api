const RoleRepo = require('../repositories/roleRepository');

exports.getRoles = async () => {
  const roles = await RoleRepo.findAll();

  return roles;
};
