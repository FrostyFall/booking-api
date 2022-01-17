const passport = require('../../config/passport');

module.exports = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    req.user = user.dataValues;

    next();
  })(req, res, next);
};
