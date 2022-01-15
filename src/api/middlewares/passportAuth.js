const passport = require('../../config/passport');
const AppError = require('../../utils/appError');

module.exports = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return next(new AppError('User not found', 400));
    }

    req.user = user.dataValues;

    next();
  })(req, res, next);
};
