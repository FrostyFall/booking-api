const UsersRolesRepo = require('../repositories/usersRolesRepository');
const RoleRepo = require('../repositories/roleRepository');
const AppError = require('../../utils/appError');

module.exports = (...roles) => {
  return async (req, res, next) => {
    const usersRoles = await UsersRolesRepo.findByUserId(req.user.id);
    const userRole = await RoleRepo.findById(usersRoles.role_id);

    if (!roles.includes(userRole.role)) {
      return next(
        new AppError('You have no permission to perform this action', 403)
      );
    }

    req.user.role = userRole.role;

    next();
  };
};
