const UsersRolesRepo = require('../repositories/usersRolesRepository');
const UserRolesRepo = require('../repositories/userRolesRepository');
const AppError = require('../../config/appError');

module.exports = (...roles) => {
  return async (req, res, next) => {
    const usersRoles = await UsersRolesRepo.findByUserId(req.user.id);
    const userRole = await UserRolesRepo.findById(usersRoles.role_id);

    if (!roles.includes(userRole.role)) {
      return next(
        new AppError('You have no permission to perform this action', 403)
      );
    }

    req.user.role = userRole.role;

    next();
  };
};
