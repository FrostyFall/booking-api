const passport = require('../../config/passport');
const AppError = require('../../config/appError');

module.exports = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return next(new AppError(info.message, 500));
    }

    req.userId = user.id;

    return next();
  })(req, res, next);
};
